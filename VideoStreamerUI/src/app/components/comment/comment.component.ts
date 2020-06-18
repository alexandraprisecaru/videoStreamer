import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MovieComment } from 'src/app/entities/movieComment';
import { WebSocketsService } from 'src/app/services/websocket.service';
import { SocialUser } from 'angularx-social-login';
import { MovieRoom } from 'src/app/entities/movieRoom';
import { Observer, Subject, fromEvent } from 'rxjs';

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
  currentCommentUser: string = "";
  inputComment: string = "";
  areCommentsVisible: boolean = true;
  isAddCommentInputVisible: boolean = false;

  commentsHiddenOnAdd = false;

  showButtons = false;

  movieCurrentTime: Subject<number> = new Subject<number>();

  constructor(private webSocketService: WebSocketsService) { }

  ngOnInit(): void {
    this.createCommentsReponsesSubscription();
    this.createCommentUpdatesSubscription();

    fromEvent(document, 'mousemove')
      .subscribe(e => {
        console.log("mouse moved" + e);
        this.showButtons = true;
        setTimeout(() => {
          this.showButtons = false;
        }, 8000);
      });
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

  sendComment() {
    if (!this.inputComment || this.inputComment === "") {
      return;
    }

    let comment: MovieComment = new MovieComment(
      this.room.Movie.Id,
      this.user,
      this.inputComment,
      this.video.currentTime);

    this.comments.push(comment);
    this.inputComment = "";
    this.hideAddComment();
    this.webSocketService.sendMovieCommentRequest(this.room.Movie.Id, comment);
  }

  stopPropagation(event: Event) {
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
    let previousComment: MovieComment;
    this.movieCurrentTime.subscribe(time => {

      let comment = this.comments.find(x => x.CurrentTime - time < 2 && x.CurrentTime - time > -2);
      if (comment) {
        if (previousComment && previousComment.Id === comment.Id) {
          return;
        }

        this.currentComment = comment.Comment;
        previousComment = comment;
        this.currentCommentUser = comment.User.firstName;
        setTimeout(() => { this.currentComment = ""; this.currentCommentUser = "" }, 20000)
      }
    });
  }

  triggerComments() {
    this.areCommentsVisible = !this.areCommentsVisible;
  }

  showAddComment() {
    this.isAddCommentInputVisible = !this.isAddCommentInputVisible;

    if (this.areCommentsVisible) {
      this.areCommentsVisible = false;
      this.commentsHiddenOnAdd = true;
    }

    this.video.pause();
  }

  hideAddComment() {
    this.isAddCommentInputVisible = !this.isAddCommentInputVisible;
    if (this.commentsHiddenOnAdd) {
      this.areCommentsVisible = true;
    }

    this.video.play();
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
