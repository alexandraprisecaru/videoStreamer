import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { WebSocketsService } from 'src/app/services/websocket.service';
import { Observer, Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { MovieRoom } from 'src/app/entities/movieRoom';
import { AuthService, SocialUser } from 'angularx-social-login';
import { SocketStatusUpdate } from 'src/app/entities/responses/SocketStatusUpdate';
import { CookieService } from 'ngx-cookie-service';
// import fscreen from 'fscreen';

@Component({
  selector: 'app-movie-room',
  templateUrl: './movie-room.component.html',
  styleUrls: ['./movie-room.component.scss']
})
export class MovieRoomComponent implements OnInit {

  menucontainer: any;

  @ViewChild('menu') set menu(menu: ElementRef) {
    if (menu) { // initially setter gets called with undefined
      this.menucontainer = menu;
    }
  }

  room: MovieRoom;
  roomId: string;

  IS_MENU_VISIBLE = "isMenuVisible";

  user: SocialUser;
  isConnected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isMenuVisible: boolean;

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
    private authService: AuthService,
    private cookieService: CookieService) {

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

      let cookieMenu = this.cookieService.get(this.IS_MENU_VISIBLE);
      if (!cookieMenu) {
        this.cookieService.delete(this.IS_MENU_VISIBLE);
        this.cookieService.set(this.IS_MENU_VISIBLE, "true");
        this.isMenuVisible = true;
      } else {
        this.isMenuVisible = cookieMenu === "true";
      }
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

  triggerMenu() {
    this.isMenuVisible = !this.isMenuVisible;

    this.cookieService.delete(this.IS_MENU_VISIBLE);
    this.cookieService.set(this.IS_MENU_VISIBLE, String(this.isMenuVisible));
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
    if (status.SocketId === this.webSocketService.socketId && status.UserId === this.user.id) {
      this.isConnected.next(false);
    }

    let user = this.room.UsersInRoom.find(x => x.User.id === status.UserId);
    if (user) {
      user.IsActive = false;
    }

  }
}
