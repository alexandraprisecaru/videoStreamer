import { Component, Input, OnChanges, ViewChild, QueryList, ElementRef, ViewChildren } from '@angular/core';
import { ChatMessage } from 'src/app/entities/chatMessage';
import { SocialUser } from 'angularx-social-login';
import { WebSocketsService } from 'src/app/services/websocket.service';
import { MovieRoom } from 'src/app/entities/movieRoom';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { UserInRoom } from 'src/app/entities/userInRoom';
import { SocketStatusUpdate } from 'src/app/entities/responses/SocketStatusUpdate';
import { Observer } from 'rxjs';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnChanges {
  @ViewChild('msgForm') formValues;
  @ViewChild('scrollframe', { static: false }) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<ChatMessage>;

  @Input() room: MovieRoom;
  @Input() user: SocialUser;

  newMessagesCount: number = 0;
  isUsersTabSelected: boolean = true;
  activeUsers: UserInRoom[] = [];

  constructor(private webSocketService: WebSocketsService) {
    this.createMovieRoomUpdatesSubscription();
    this.createUserDisconnectedSubscription();
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (!this.room || !this.user) {
      return;
    }

    this.activeUsers = this.room.UsersInRoom.filter(x => x.IsActive === true);
  }

  selectionChange(event: MatTabChangeEvent) {
    console.log(event.index);
    this.isUsersTabSelected = event.index === 0;
  }

  private processMovieRoom(room: MovieRoom): void {
    console.debug('Movie Room received through the observer:\n%o', room);

    this.room = room;
    this.activeUsers = this.room.UsersInRoom.filter(x => x.IsActive);
  }

  private createMovieRoomUpdatesSubscription() {
    let self = this;
    const movieRoomUpdatesObserver: Observer<MovieRoom> = {
      next: function (room: MovieRoom): void {
        if (room.Id !== self.room.Id) {
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
      return;
    }

    let user = this.room.UsersInRoom.find(x => x.User.id === status.UserId);
    if (user) {
      user.IsActive = false;
    }

    this.activeUsers = this.room.UsersInRoom.filter(x => x.IsActive);
  }
}
