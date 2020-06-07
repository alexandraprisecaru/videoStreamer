import { Component, OnInit } from '@angular/core';
import { WebSocketsService } from 'src/app/services/websocket.service';
import { Observer } from 'rxjs';
import { Movie } from 'src/app/entities/movie';

@Component({
  selector: 'movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.scss']
})
export class MovielistComponent implements OnInit {

  private movies: Movie[] = [];
  constructor(private webSocketService: WebSocketsService) { }

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

    // const clearBalanceObserver: Observer<void> = {
    //   next: function (): void {
    //     self.clearBalance();
    //   },

    //   error: function (err: any): void {
    //     console.error('Error: %o', err);
    //   },

    //   complete: function (): void {
    //     console.log('Complete called on the clearBalanceObserver');
    //   }
    // };

    // this.inputDisplayCommService.subscribeToClearBalance(clearBalanceObserver);
  }

  // private process(accountBalance: AccountBalance): void {
  //   console.debug('Account Balance received through the observer:\n%o', accountBalance);

  //   if (accountBalance.version > this.currentBalanceVersion) {
  //     if (this.currentBalanceVersion === -1) {
  //       this.showBalance = true;
  //     }

  //     this.balance = String(accountBalance.balance);
  //     this.currentBalanceVersion = accountBalance.version;
  //   }
  // }

  private process(movieList: Movie[]): void {
    console.debug('Movies received through the observer:\n%o', movieList);

    // if (accountBalance.version > this.currentBalanceVersion) {
    //   if (this.currentBalanceVersion === -1) {
    //     this.showBalance = true;
    //   }

    this.movies = movieList;

    // this.balance = String(movieList.balance);
    // this.currentBalanceVersion = accountBalance.version;
  }
}
