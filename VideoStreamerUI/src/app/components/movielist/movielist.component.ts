import { Component, OnInit } from '@angular/core';
import { WebSocketsService } from 'src/app/services/websocket.service';
import { Observer } from 'rxjs';
import { Movie } from 'src/app/entities/movie';
import { Router } from '@angular/router';
import { MovieRoom } from 'src/app/entities/movieRoom';

@Component({
  selector: 'movie-list',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.scss']
})
export class MovielistComponent implements OnInit {

  movies: Movie[] = [];
  movieRooms: MovieRoom[] = [];
  constructor(private webSocketService: WebSocketsService, private router: Router) { }

  ngOnInit(): void {
    this.createMovieListResponsesSubscription();
    this.createMovieListUpdatesSubscription();

    this.createMovieRoomsResponsesSubscription();
    this.createMovieRoomsUpdatesSubscription();

    this.createMovieRoomResponsesSubscription();
    this.createMovieRoomUpdatesSubscription();

    this.webSocketService.sendMovieListRequest();
    // this.webSocketService.sendMovieRoomsRequest();
  }

  goToMovie(movie: Movie) {
    console.log(movie);

    this.webSocketService.sendMovieRoomRequest(movie.Id);
  }

  private processMovies(movieList: Movie[]): void {
    console.debug('Movies received through the observer:\n%o', movieList);

    this.movies = movieList;
  }

  private processMovieRoom(room: MovieRoom): void {
    console.debug('Movie Room received through the observer:\n%o', room);

    this.router.navigate([`movies/${room.Id}`]);
  }

  private processMovieRooms(rooms: MovieRoom[]): void {
    console.debug('Movie Rooms received through the observer:\n%o', rooms);

    this.movieRooms = rooms;
  }

  private createMovieListResponsesSubscription() {
    let self = this;
    const movieListResponsesObserver: Observer<Movie[]> = {
      next: function (movies: Movie[]): void {
        self.processMovies(movies);
      },

      error: function (err: any): void {
        console.error('Error: %o', err);
      },

      complete: function (): void {
        console.log('No more movies responses');
      }
    };

    this.webSocketService.subscribeToMovieListResponses(movieListResponsesObserver);
  }

  private createMovieListUpdatesSubscription() {
    let self = this;
    const movieListUpdatesObserver: Observer<Movie[]> = {
      next: function (movies: Movie[]): void {
        self.processMovies(movies);
      },

      error: function (err: any): void {
        console.error('Error: %o', err);
      },

      complete: function (): void {
        console.log('No more movies updates');
      }
    };

    this.webSocketService.subscribeToMovieListUpdates(movieListUpdatesObserver);
  }

  private createMovieRoomsResponsesSubscription() {
    let self = this;
    const movieRoomsResponsesObserver: Observer<MovieRoom[]> = {
      next: function (movieRooms: MovieRoom[]): void {
        self.processMovieRooms(movieRooms);
      },

      error: function (err: any): void {
        console.error('Error: %o', err);
      },

      complete: function (): void {
        console.log('No more movies responses');
      }
    };

    this.webSocketService.subscribeToMovieRoomsResponses(movieRoomsResponsesObserver);
  }

  private createMovieRoomsUpdatesSubscription() {
    let self = this;
    const movieRoomsUpdatesObserver: Observer<MovieRoom[]> = {
      next: function (movieRooms: MovieRoom[]): void {
        self.processMovieRooms(movieRooms);
      },

      error: function (err: any): void {
        console.error('Error: %o', err);
      },

      complete: function (): void {
        console.log('No more movies updates');
      }
    };

    this.webSocketService.subscribeToMovieRoomsUpdates(movieRoomsUpdatesObserver);
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
