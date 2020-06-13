import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MovieComment } from 'src/app/entities/movieComment';
import { WebSocketsService } from 'src/app/services/websocket.service';
import { SocialUser } from 'angularx-social-login';
import { MovieRoom } from 'src/app/entities/movieRoom';
import { Observer, Subject } from 'rxjs';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnChanges {

  @Input() room: MovieRoom;
  @Input() video: HTMLVideoElement;
  @Input() user: SocialUser;

  comments: MovieComment[] = [];
  currentComment: string = "";

  movieCurrentTime: Subject<number> = new Subject<number>();

  constructor(private webSocketService: WebSocketsService) { }

  ngOnInit(): void {
    this.createCommentsReponsesSubscription();
    this.createCommentUpdatesSubscription();
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (!this.room || !this.user || !this.video) {
      return;
    }

    this.webSocketService.sendMovieCommentsRequest(this.room.Movie.Id);
    this.video.ontimeupdate = () => {
      setTimeout(() => { this.movieCurrentTime.next(this.video.currentTime); }, 1000)
    }
  }

  sendComment(value: string) {
    let comment: MovieComment = new MovieComment(
      this.room.Movie.Id,
      this.user,
      value,
      this.video.currentTime);

    this.comments.push(comment);

    this.webSocketService.sendMovieCommentRequest(this.room.Movie.Id, comment);
  }

  spacePressed(event: Event) {
    event.stopPropagation();
  }

  addComment(comment: MovieComment) {
    if (comment == null) {
      return;
    }

    if (comment.MovieId !== this.room.Movie.Id) {
      return;
    }

    this.comments.push(comment);
  }

  setComments(comments: MovieComment[]) {
    if (comments === null || comments === undefined || comments.length === 0) {
      return;
    }

    if (comments[0].MovieId !== this.room.Movie.Id) {
      return;
    }

    this.comments = comments;
    this.show();
  }

  show() {
    this.movieCurrentTime.subscribe(time => {

      let comment = this.comments.find(x => x.Shown === undefined && x.CurrentTime - time < 2 && x.CurrentTime - time > -2);
      if (comment) {
        this.currentComment = `${comment.User.firstName}: ${comment.Comment}`;
        comment.Shown = true;
        setTimeout(() => { this.currentComment = "" }, 2000)
      }
    });
  }

  private createCommentsReponsesSubscription() {
    let self = this;
    const commentsResponseObserver: Observer<MovieComment[]> = {
      next: function (messages: MovieComment[]): void {
        if (!messages || messages.length === 0) {
          return;
        }

        self.setComments(messages);
      },

      error: function (err: any): void {
        console.error('Error: %o', err);
      },

      complete: function (): void {
        console.log('No more chat messages responses');
      }
    };

    this.webSocketService.subscribeToMovieCommentsReponses(commentsResponseObserver);
  }

  private createCommentUpdatesSubscription() {
    let self = this;
    const commentsUpdateObserver: Observer<MovieComment> = {
      next: function (message: MovieComment): void {
        if (!message) {
          return;
        }

        self.addComment(message);
      },

      error: function (err: any): void {
        console.error('Error: %o', err);
      },

      complete: function (): void {
        console.log('No more chat message updates');
      }
    };

    this.webSocketService.subscribeToMovieCommentUpdates(commentsUpdateObserver);
  }
}
