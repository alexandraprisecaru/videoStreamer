import { Component, OnInit, Input, OnChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { WebSocketsService } from 'src/app/services/websocket.service';
import { MovieRoom } from 'src/app/entities/movieRoom';
import { MatVideoComponent } from 'mat-video/lib/video.component';
import { Observer } from 'rxjs';
import { SocialUser } from 'angularx-social-login';

@Component({
  selector: 'movie-player',
  templateUrl: './movie-player.component.html',
  styleUrls: ['./movie-player.component.scss']
})
export class MoviePlayerComponent implements OnInit, OnChanges {
  videoComp: MatVideoComponent;
  htmlVideo: HTMLVideoElement;
  @ViewChild('video') set matVideo(matVideo: MatVideoComponent) {
    if (matVideo) { // initially setter gets called with undefined
      this.videoComp = matVideo;

      this.htmlVideo = this.videoComp.getVideoTag();
    }
  }

  @Input() room: MovieRoom;
  @Input() user: SocialUser;

  seekedByWS: boolean = false;

  constructor(
    private webSocketService: WebSocketsService,
    private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.createMovieRoomPauseUpdatesSubscription();
    this.createMovieRoomPlayUpdatesSubscription();
    this.createMovieRoomSeekUpdatesSubscription();
  }

  ngOnChanges() {
    if (!this.room || !this.user) {
      return;
    }

    this.title = this.room.Movie.Title;
    this.changeDetector.detectChanges();

    this.htmlVideo.onpause = () => {
      // check if it's on pause already-> don't make request
      console.log(`on pause called, current time: ${this.htmlVideo.currentTime}`);

      // send ws request to pause video for all
      this.webSocketService.sendPauseRequest(this.room.Id, this.htmlVideo.currentTime);
    }

    this.htmlVideo.onplay = () => {
      console.log(`on play called, current time: ${this.htmlVideo.currentTime}`);

      // send ws reuqest to play the video
      this.webSocketService.sendPlayRequest(this.room.Id, this.htmlVideo.currentTime);
    }

    this.htmlVideo.onseeked = () => {
      console.log(`on seeked moved called, current time: ${this.htmlVideo.currentTime}`);
      if (!this.seekedByWS) {
        // send ws request to update the time
        this.webSocketService.sendSeekRequest(this.room.Id, this.htmlVideo.currentTime);
      }

      this.seekedByWS = false;
    }
  }

  private pause(roomId: string, currentTime: number) {
    if (roomId !== this.room.Id) {
      return;
    }

    this.changeDetector.detectChanges();
    this.htmlVideo.pause();

    this.currentTime = currentTime;
  }

  private play(roomId: string, currentTime: number) {
    if (roomId !== this.room.Id) {
      return;
    }

    this.changeDetector.detectChanges();
    this.htmlVideo.play();

    this.currentTime = currentTime;
  }

  private seek(roomId: string, currentTime: number) {
    if (roomId !== this.room.Id) {
      return;
    }

    this.changeDetector.detectChanges();
    this.seekedByWS = true;

    this.htmlVideo.currentTime = currentTime;

    this.currentTime = currentTime;
  }

  private createMovieRoomPauseUpdatesSubscription() {
    let self = this;
    const movieRoomResponsesObserver: Observer<MovieRoom> = {
      next: function (room: MovieRoom): void {
        self.pause(room.Id, room.TimeWatched);
      },

      error: function (err: any): void {
        console.error('Error: %o', err);
      },

      complete: function (): void {
        console.log('No more movies responses');
      }
    };

    this.webSocketService.subscribeToMovieRoomPauseUpdates(movieRoomResponsesObserver);
  }

  private createMovieRoomPlayUpdatesSubscription() {
    let self = this;
    const movieRoomUpdatesObserver: Observer<MovieRoom> = {
      next: function (room: MovieRoom): void {
        self.play(room.Id, room.TimeWatched);
      },

      error: function (err: any): void {
        console.error('Error: %o', err);
      },

      complete: function (): void {
        console.log('No more movies responses');
      }
    };

    this.webSocketService.subscribeToMovieRoomPlayUpdates(movieRoomUpdatesObserver);
  }

  private createMovieRoomSeekUpdatesSubscription() {
    let self = this;
    const movieRoomUpdatesObserver: Observer<MovieRoom> = {
      next: function (room: MovieRoom): void {
        self.seek(room.Id, room.TimeWatched);
      },

      error: function (err: any): void {
        console.error('Error: %o', err);
      },

      complete: function (): void {
        console.log('No more movies responses');
      }
    };

    this.webSocketService.subscribeToMovieRoomSeekUpdates(movieRoomUpdatesObserver);
  }

  ngclass: any;
  src: string = "http://static.videogular.com/assets/videos/videogular.mp4";
  title: string = this.room ? this.room.Movie.Title : "Not loaded yet";
  autoplay: boolean = true;
  preload: boolean = true;
  loop: boolean = false;
  fullscreen: boolean = false;
  download: boolean = false;
  quality: boolean = true;
  keyboard: boolean = true;
  spinner: any;
  poster: any;
  muted: boolean = true;
  overlay: boolean = true;
  showFrameByFrame: boolean = false;
  currentTime: number = 1;
  color: any;
}
