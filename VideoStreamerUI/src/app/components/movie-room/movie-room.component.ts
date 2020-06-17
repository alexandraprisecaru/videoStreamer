import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { WebSocketsService } from 'src/app/services/websocket.service';
import { Observer, Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { MovieRoom } from 'src/app/entities/movieRoom';
import { AuthService, SocialUser } from 'angularx-social-login';
import { SocketStatusUpdate } from 'src/app/entities/responses/SocketStatusUpdate';
// import fscreen from 'fscreen';

@Component({
  selector: 'app-movie-room',
  templateUrl: './movie-room.component.html',
  styleUrls: ['./movie-room.component.scss']
})
export class MovieRoomComponent implements OnInit {

  @ViewChild("menucontainer") menucontainer: HTMLElement;
  room: MovieRoom;
  roomId: string;

  user: SocialUser;
  isConnected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  // hasFullscreenSupport: boolean;
  // isFullscreen: boolean;

  // ngOnDestroy() {
  //   if (this.hasFullscreenSupport) {
  //     fscreen.removeEventListener('fullscreenchange');
  //   }
  // }

  // toggleFullscreen() {
  //   if (this.hasFullscreenSupport && !this.isFullscreen) {
  //     const elem = document.body;
  //     fscreen.requestFullscreen(elem);
  //   } else {
  //     fscreen.exitFullscreen();
  //   }
  // }

  constructor(private route: ActivatedRoute,
    private webSocketService: WebSocketsService,
    private authService: AuthService) {

    this.route.params.subscribe(params => {
      console.log(params);

      this.authService.authState.subscribe(user => {
        if (user !== null && user !== undefined) {
          this.user = user;

          this.roomId = params["room-id"];
          console.log(this.roomId);

          this.webSocketService.sendMovieRoomWithIdRequest(this.roomId);
        }
      })
    });

    // this.hasFullscreenSupport = fscreen.fullscreenEnabled;

    // if (this.hasFullscreenSupport) {
    //   fscreen.addEventListener('fullscreenchange', () => {
    //     this.isFullscreen = (fscreen.fullscreenElement !== null);
    //   }, false);
    // }
  }

  ngOnInit(): void {
    this.createMovieRoomResponsesSubscription();
    this.createMovieRoomUpdatesSubscription();
    this.createUserDisconnectedSubscription();
  }
  
  private processMovieRoom(room: MovieRoom): Observable<MovieRoom> {
    console.debug('Movie Room received through the observer:\n%o', room);

    this.room = room;

    return of(room);
  }

  private createMovieRoomResponsesSubscription() {
    let self = this;
    const movieRoomResponsesObserver: Observer<MovieRoom> = {
      next: function (room: MovieRoom): void {
        self.processMovieRoom(room).subscribe(room => {
          self.webSocketService.sendMovieCommentsRequest(room.Movie.Id);
        });
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

  private createUserDisconnectedSubscription() {
    let self = this;
    const socketStatusUpdatesObserver: Observer<SocketStatusUpdate> = {
      next: function (status: SocketStatusUpdate): void {
        self.userDisconnected(status);
      },

      error: function (err: any): void {
        console.error('Error: %o', err);
      },

      complete: function (): void {
        console.log('No more socket status updates');
      }
    };

    this.webSocketService.subscribeToUserDisconnected(socketStatusUpdatesObserver);
  }

  userDisconnected(status: SocketStatusUpdate) {
    if (status.SocketId === this.webSocketService.socketId) {
      this.isConnected.next(false);
    }
  }
}
