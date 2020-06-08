import { Component, OnInit } from '@angular/core';
import { WebSocketsService } from 'src/app/services/websocket.service';
import { Observer } from 'rxjs';
import { Movie } from 'src/app/entities/movie';
import { Router } from '@angular/router';

@Component({
  selector: 'movie-list',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.scss']
})
export class MovielistComponent implements OnInit {

  movies: Movie[] = [];
  constructor(private webSocketService: WebSocketsService, private router: Router) { }

  ngOnInit(): void {
    // we need the "self" constant because we cannot use "this" inside the functions below
    const self = this;

    const movieListResponsesObserver: Observer<Movie[]> = {
      next: function (movies: Movie[]): void {
        self.process(movies);
      },

      error: function (err: any): void {
        console.error('Error: %o', err);
      },

      complete: function (): void {
        console.log('No more movies responses');
      }
    };

    this.webSocketService.subscribeToMovieListResponses(movieListResponsesObserver);

    const movieListUpdatesObserver: Observer<Movie[]> = {
      next: function (movies: Movie[]): void {
        self.process(movies);
      },

      error: function (err: any): void {
        console.error('Error: %o', err);
      },

      complete: function (): void {
        console.log('No more movies updates');
      }
    };

    this.webSocketService.subscribeToMovieListUpdates(movieListUpdatesObserver);
    this.webSocketService.sendMovieListRequest();
  }


  goToMovie(movieId: string) {
    // this.webSocketService.sendMovieRoomRequest(movieId, userId)


    // this.router.navigate([`movie/${movieId}/${}`])
    // return {};
  }

  private process(movieList: Movie[]): void {
    console.debug('Movies received through the observer:\n%o', movieList);

    this.movies = movieList;
  }
}
