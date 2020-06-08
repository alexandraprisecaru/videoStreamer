import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { WebSocketsService } from 'src/app/services/websocket.service';
import { Observer } from 'rxjs';
import { MovieRoom } from 'src/app/entities/movieRoom';
import { MatVideoComponent } from 'mat-video/lib/video.component';


@Component({
  selector: 'app-movie-room',
  templateUrl: './movie-room.component.html',
  styleUrls: ['./movie-room.component.scss']
})
export class MovieRoomComponent implements OnInit {

  private video: MatVideoComponent;
  @ViewChild('video') set matVideo(matVideo: MatVideoComponent) {
    if (matVideo) { // initially setter gets called with undefined
      this.video = matVideo;
    }
  }

  room: MovieRoom;

  roomId: string;

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
  color: any;
  spinner: any;
  poster: any;
  muted: boolean = true;
  overlay: boolean = true;
  showFrameByFrame: boolean = false;
  currentTime: number = 1;

  seekedByWS: boolean = false;

  constructor(private route: ActivatedRoute, private changeDetector: ChangeDetectorRef, private webSocketService: WebSocketsService) {
    this.route.params.subscribe(params => {
      console.log(params);

      this.roomId = params["room-id"];
      console.log(this.roomId);
      this.webSocketService.sendMovieRoomWithIdRequest(this.roomId);
    });
  }

  ngOnInit(): void {
    this.createMovieRoomResponsesSubscription();
    this.createMovieRoomUpdatesSubscription();

    this.createMovieRoomPauseUpdatesSubscription();
    this.createMovieRoomPlayUpdatesSubscription();
    this.createMovieRoomSeekUpdatesSubscription();
  }

  private processMovieRoom(room: MovieRoom): void {
    console.debug('Movie Room received through the observer:\n%o', room);

    this.room = room;
    this.title = room.Movie.Title;
    this.changeDetector.detectChanges();

    this.currentTime = room.TimeWatched;

    this.video.timeChange.subscribe(() => {
      // send ws request to update timewatched 
    });

    this.video.getVideoTag().onpause = () => {
      // check if it's on pause already-> don't make request
      console.log(`on pause called, current time: ${this.video.getVideoTag().currentTime}`);

      // send ws request to pause video for all
      this.webSocketService.sendPauseRequest(this.roomId, this.video.getVideoTag().currentTime);
    }

    this.video.getVideoTag().onplay = () => {
      console.log(`on play called, current time: ${this.video.getVideoTag().currentTime}`);

      // send ws reuqest to play the video
      this.webSocketService.sendPlayRequest(this.roomId, this.video.getVideoTag().currentTime);
    }

    this.video.getVideoTag().onseeked = () => {
      console.log(`on seeked moved called, current time: ${this.video.getVideoTag().currentTime}`);
      if (!this.seekedByWS) {
        // send ws request to update the time
        this.webSocketService.sendSeekRequest(this.roomId, this.video.getVideoTag().currentTime);
      }

      this.seekedByWS = false;
    }

    console.log(`title: ${this.video.title}`);
  }

  private pause(roomId: string, currentTime: number) {
    if (roomId !== this.roomId) {
      return;
    }

    this.changeDetector.detectChanges();
    this.video.getVideoTag().pause();

    this.currentTime = currentTime;
  }

  private play(roomId: string, currentTime: number) {
    if (roomId !== this.roomId) {
      return;
    }

    this.changeDetector.detectChanges();
    this.video.getVideoTag().play();

    this.currentTime = currentTime;
  }

  private seek(roomId: string, currentTime: number) {
    if (roomId !== this.roomId) {
      return;
    }

    this.changeDetector.detectChanges();
    this.seekedByWS = true;

    this.video.getVideoTag().currentTime = currentTime;

    this.currentTime = currentTime;
  }

  private createMovieRoomResponsesSubscription() {
    let self = this;
    const movieRoomResponsesObserver: Observer<MovieRoom> = {
      next: function (room: MovieRoom): void {
        self.processMovieRoom(room);
      },

      error: function (err: any): void {
        console.error('Error: %o', err);
      },

      complete: function (): void {
        console.log('No more movies responses');
      }
    };

    this.webSocketService.subscribeToMovieRoomResponses(movieRoomResponsesObserver);
  }

  private createMovieRoomUpdatesSubscription() {
    let self = this;
    const movieRoomUpdatesObserver: Observer<MovieRoom> = {
      next: function (room: MovieRoom): void {
        if (room.Id !== self.roomId) {
          return;
        }

        self.processMovieRoom(room);
      },

      error: function (err: any): void {
        console.error('Error: %o', err);
      },

      complete: function (): void {
        console.log('No more movies responses');
      }
    };

    this.webSocketService.subscribeToMovieRoomUpdates(movieRoomUpdatesObserver);
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
}
