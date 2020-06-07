import { Injectable } from '@angular/core';
import { Observer, Subject } from 'rxjs';

import { AppConfigService } from './appConfig.service';
import { MessageWrapper } from '../entities/messageWrapper';
import { MessageType } from '../entities/messageType';

import { AccountBalance } from '../entities/accountBalance';
import { AccountBalanceRequest } from '../entities/accountBalanceRequest';
import { TransferReceived } from '../entities/transferReceived';
import { Transfer } from '../entities/transfer';
import { TransfersSubscriptionRequest } from '../entities/transfersSubscriptionRequest';
import { Movie } from '../entities/movie';
import { MovieListRequest } from '../entities/movieListRequest';

@Injectable({
  providedIn: 'root'
})
export class WebSocketsService {
  private webSocket: WebSocket;

  // Maybe we only need one balance subject
  private balanceResponseSubject: Subject<AccountBalance>;
  private movieListResponseSubject: Subject<Movie[]>;
  private movieListUpdateSubject: Subject<Movie[]>;
  private balanceUpdateSubject: Subject<AccountBalance>;

  private transferReceivedSubject: Subject<Transfer>;

  constructor(private appConfigService: AppConfigService) {
    this.balanceResponseSubject = new Subject<AccountBalance>();
    this.movieListResponseSubject = new Subject<Movie[]>();
    this.movieListUpdateSubject = new Subject<Movie[]>();
    this.balanceUpdateSubject = new Subject<AccountBalance>();
    this.transferReceivedSubject = new Subject<Transfer>();
  }

  public start(): void {
    console.debug('Going to connect to the websockets server');
    this.connect(this.appConfigService.webSocketsServerUrl);
  }

  public stop(): void {
    if (this.webSocket != null) {
      this.webSocket.close();
    }
  }

  public subscribeToMovieListResponses(observer: Observer<Movie[]>): void {
    this.movieListResponseSubject.subscribe(observer);
  }

  public subscribeToMovieListUpdates(observer: Observer<Movie[]>): void {
    this.movieListResponseSubject.subscribe(observer);
  }

  public subscribeToBalanceResponses(observer: Observer<AccountBalance>): void {
    this.balanceResponseSubject.subscribe(observer);
  }

  public subscribeToBalanceUpdates(observer: Observer<AccountBalance>): void {
    this.balanceUpdateSubject.subscribe(observer);
  }

  public subscribeToTransfers(observer: Observer<Transfer>): void {
    this.transferReceivedSubject.subscribe(observer);
  }

  private connect(url: string): void {
    this.webSocket = new WebSocket(url);

    this.webSocket.onopen = function (messageEvent: MessageEvent) {
      console.info('WebSocket connection has been opened: %o', messageEvent);
    };

    // we need the "self" constant because we cannot use "this" inside the function below
    const self = this;

    const onMessage = function (messageEvent: MessageEvent) {
      const jsonReceived: string = messageEvent.data;

      console.debug('WebSocket message received: %s', jsonReceived);

      let messageWrapper: MessageWrapper;
      try {
        messageWrapper = JSON.parse(jsonReceived);
      } catch (error) {
        console.error('Unable to parse received JSON string: %s\n%o',
          jsonReceived, error);
        return;
      }

      if (!messageWrapper.hasOwnProperty('type') ||
        !messageWrapper.hasOwnProperty('payload')) {
        console.error('Invalid message received, not the correct properties: %s',
          jsonReceived);
        return;
      }

      if (messageWrapper.type === MessageType.MOVIE_LIST_RESPONSE) {
        let movies: Movie[] = [];
        try {
          movies = JSON.parse(messageWrapper.payload);
        } catch (error) {
          console.error('Unable to deserialize Movie[] object: %s',
            messageWrapper.payload);
          return;
        }

        console.debug('Movies message received: %o', movies);
        self.movieListResponseSubject.next(movies);
      } else if (messageWrapper.type === MessageType.BALANCE_DATA_RESPONSE ||
        messageWrapper.type === MessageType.BALANCE_DATA_UPDATE) {
        let accountBalance: AccountBalance;
        try {
          accountBalance = JSON.parse(messageWrapper.payload);
        } catch (error) {
          console.error('Unable to deserialize AccountBalance object: %s',
            messageWrapper.payload);
          return;
        }

        console.debug('AccountBalance message received: %o', accountBalance);
        if (messageWrapper.type === MessageType.BALANCE_DATA_RESPONSE) {
          self.balanceResponseSubject.next(accountBalance);
        }

        if (messageWrapper.type === MessageType.BALANCE_DATA_UPDATE) {
          self.balanceUpdateSubject.next(accountBalance);
        }
      } else {
        if (messageWrapper.type === MessageType.TRANSFER_DATA_UPDATE) {
          let transferReceived: TransferReceived;
          try {
            transferReceived = JSON.parse(messageWrapper.payload);
          } catch (error) {
            console.error('Unable to deserialize Transfer object: %s',
              messageWrapper.payload);
          }

          const transfer: Transfer = new Transfer(transferReceived);
          console.debug('Transfer data message received: %o', transfer);
          self.transferReceivedSubject.next(transfer);

        } else {
          console.error('Invalid message type: %s', messageWrapper.type);
        }
      }
    };

    this.webSocket.onmessage = onMessage;

    this.webSocket.onerror = function (messageEvent: MessageEvent) {
      console.error('WebSocket error observed: %o', messageEvent);
    };

    this.webSocket.onclose = function (closeEvent: CloseEvent) {
      console.info('WebSocket connection has been closed: %o', closeEvent);
    };
  }

  public sendAccountBalanceRequestAndSubscriptions(accountId: string): void {
    this.sendAccountBalanceRequest(accountId);
    this.sendAccountBalanceSubscriptionRequest(accountId);
    this.sendTransfersSubscriptionRequest(accountId);
  }
  public sendMovieListAndRoomsRequests(userId: string): void {
    this.sendMovieListRequest();
    // todo: send rooms request for user id
  }

  private sendAccountBalanceRequest(accountId: string): void {
    const request: AccountBalanceRequest = new AccountBalanceRequest(accountId);
    const message: MessageWrapper = new MessageWrapper(MessageType.BALANCE_DATA_REQUEST, request);
    this.send(message);
  }

  public sendMovieListRequest(): void {
    const request: MovieListRequest = new MovieListRequest();
    const message: MessageWrapper = new MessageWrapper(MessageType.MOVIE_LIST_REQUEST, request);

    this.sendMessage(this.webSocket, message);
  }

  private sendAccountBalanceSubscriptionRequest(accountId: string): void {
    const request: AccountBalanceRequest = new AccountBalanceRequest(accountId);
    const message: MessageWrapper = new MessageWrapper(MessageType.BALANCE_DATA_SUBSCRIPTION, request);
    this.send(message);
  }

  private sendTransfersSubscriptionRequest(accountId: string): void {
    const request: TransfersSubscriptionRequest = new TransfersSubscriptionRequest(accountId);
    const message: MessageWrapper = new MessageWrapper(MessageType.TRANSFER_DATA_SUBSCRIPTION, request);
    this.send(message);
  }

  private send(message: MessageWrapper) {
    try {
      this.webSocket.send(JSON.stringify(message));
    } catch (error) {
      console.error('Sending message failed.\nMessage:\n%o\nError:\n%o', message, error);
    }
  }

  private waitForOpenConnection(socket: WebSocket) {
    return new Promise((resolve, reject) => {
      const maxNumberOfAttempts = 10
      const intervalTime = 200 //ms

      let currentAttempt = 0
      const interval = setInterval(() => {
        if (currentAttempt > maxNumberOfAttempts - 1) {
          clearInterval(interval)
          reject(new Error('Maximum number of attempts exceeded'))
        } else if (socket.readyState === socket.OPEN) {
          clearInterval(interval)
          resolve()
        }
        currentAttempt++
      }, intervalTime)
    })
  }

  private async sendMessage(socket: WebSocket, message: MessageWrapper) {
    if (socket.readyState !== socket.OPEN) {
      try {
        await this.waitForOpenConnection(socket);
      } catch (err) {
        console.error(err)
        return;
      }
    }

    socket.send(JSON.stringify(message))
  }
}