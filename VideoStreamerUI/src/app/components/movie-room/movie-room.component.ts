import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { WebSocketsService } from 'src/app/services/websocket.service';
import { Observer } from 'rxjs';
import { MovieRoom } from 'src/app/entities/movieRoom';


@Component({
  selector: 'app-movie-room',
  templateUrl: './movie-room.component.html',
  styleUrls: ['./movie-room.component.scss']
})
export class MovieRoomComponent implements OnInit {
  room: MovieRoom;

  roomId: string;

  constructor(private route: ActivatedRoute, private webSocketService: WebSocketsService) {
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
  }

  private processMovieRoom(room: MovieRoom): void {
    console.debug('Movie Room received through the observer:\n%o', room);

    this.room = room;
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

}
