import { Injectable, OnInit } from '@angular/core';
import { Observer, Subject } from 'rxjs';

import { AppConfigService } from './appConfig.service';
import { MessageWrapper } from '../entities/messageWrapper';
import { MessageType } from '../entities/messageType';
import { Movie } from '../entities/movie';
import { MovieListRequest } from '../entities/requests/movieListRequest';
import { AuthService, SocialUser } from 'angularx-social-login';
import { MovieRoomRequest } from '../entities/requests/movieRoomRequest';
import { MovieRoom } from '../entities/movieRoom';
import { MovieRoomsRequest } from '../entities/requests/movieRoomsRequest';
import { SaveUserRequest } from '../entities/requests/saveUserRequest';
import { MovieRoomWithIdRequest } from '../entities/requests/movieRoomWithIdRequest';

@Injectable({
  providedIn: 'root'
})
export class WebSocketsService {
  private user: SocialUser;
  private webSocket: WebSocket;

  // Maybe we only need one balance subject
  private movieListResponseSubject: Subject<Movie[]>;
  private movieListUpdateSubject: Subject<Movie[]>;

  private movieRoomsResponseSubject: Subject<MovieRoom[]>;
  private movieRoomsUpdateSubject: Subject<MovieRoom[]>;

  private movieRoomResponseSubject: Subject<MovieRoom>;
  private movieRoomUpdateSubject: Subject<MovieRoom>;

  constructor(private appConfigService: AppConfigService, private authService: AuthService) {
    this.authService.authState.subscribe((user) => {
      if (user !== null && user !== undefined) {
        this.user = user;
        console.log(this.user);
      }
    });

    this.movieListResponseSubject = new Subject<Movie[]>();
    this.movieListUpdateSubject = new Subject<Movie[]>();

    this.movieRoomsResponseSubject = new Subject<MovieRoom[]>();
    this.movieRoomsUpdateSubject = new Subject<MovieRoom[]>();

    this.movieRoomResponseSubject = new Subject<MovieRoom>();
    this.movieRoomUpdateSubject = new Subject<MovieRoom>();
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
    this.movieListUpdateSubject.subscribe(observer);
  }

  public subscribeToMovieRoomsResponses(observer: Observer<MovieRoom[]>): void {
    this.movieRoomsResponseSubject.subscribe(observer);
  }

  public subscribeToMovieRoomsUpdates(observer: Observer<MovieRoom[]>): void {
    this.movieRoomsUpdateSubject.subscribe(observer);
  }

  public subscribeToMovieRoomResponses(observer: Observer<MovieRoom>): void {
    this.movieRoomResponseSubject.subscribe(observer);
  }

  public subscribeToMovieRoomUpdates(observer: Observer<MovieRoom>): void {
    this.movieRoomUpdateSubject.subscribe(observer);
  }

  private connect(url: string): void {
    this.webSocket = new WebSocket(url);

    this.webSocket.onopen = function (messageEvent: MessageEvent) {
      console.info('WebSocket connection has been opened: %o', messageEvent);
    };

    // we need the "self" constant because we cannot use "this" inside the function below
    const self = this;

    this.webSocket.onmessage = function (messageEvent: MessageEvent) {
      const jsonReceived: string = messageEvent.data;

      console.debug('WebSocket message received: %s', jsonReceived);

      self.handleMessage(jsonReceived);
    };;

    this.webSocket.onerror = function (messageEvent: MessageEvent) {
      console.error('WebSocket error observed: %o', messageEvent);
    };

    this.webSocket.onclose = function (closeEvent: CloseEvent) {
      console.info('WebSocket connection has been closed: %o', closeEvent);
    };
  }

  public sendMovieListAndRoomsRequests(userId: string): void {
    this.sendMovieListRequest();
    // todo: send rooms request for user id
  }

  public sendSaveUserRequest(user: SocialUser): void {
    const request: SaveUserRequest = new SaveUserRequest(user);
    const message: MessageWrapper = new MessageWrapper(MessageType.SAVE_USER_REQUEST, request);

    this.sendMessage(this.webSocket, message);
  }

  public sendMovieListRequest(): void {
    const request: MovieListRequest = new MovieListRequest();
    const message: MessageWrapper = new MessageWrapper(MessageType.MOVIE_LIST_REQUEST, request);

    this.sendMessage(this.webSocket, message);
  }

  public sendMovieStreamRequest(): void {
    const request: MovieListRequest = new MovieListRequest();
    const message: MessageWrapper = new MessageWrapper(MessageType.MOVIE_LIST_REQUEST, request);

    this.sendMessage(this.webSocket, message);
  }

  public sendMovieRoomsRequest(): void {
    this.authService.authState.subscribe(user => {
      const request: MovieRoomsRequest = new MovieRoomsRequest(user.id);
      const message: MessageWrapper = new MessageWrapper(MessageType.MOVIE_ROOMS_REQUEST, request);

      this.sendMessage(this.webSocket, message);
    });
  }

  public sendMovieRoomRequest(movieId: string): void {
    this.authService.authState.subscribe(user => {
      const request: MovieRoomRequest = new MovieRoomRequest(movieId, user.id);
      const message: MessageWrapper = new MessageWrapper(MessageType.MOVIE_ROOM_REQUEST, request);

      this.sendMessage(this.webSocket, message);
    });
  }

  public sendMovieRoomWithIdRequest(roomId: string): void {
    this.authService.authState.subscribe(user => {
      const request: MovieRoomWithIdRequest = new MovieRoomWithIdRequest(roomId, user.id);
      const message: MessageWrapper = new MessageWrapper(MessageType.MOVIE_ROOM_WITH_ID_REQUEST, request);

      this.sendMessage(this.webSocket, message);
    });
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

  private handleMessage(messageRecieved: string) {
    let messageWrapper = this.validateAndGetMessage(messageRecieved);

    switch (messageWrapper.type) {
      case MessageType.MOVIE_LIST_RESPONSE:
        let movies: Movie[] = [];
        try {
          movies = JSON.parse(messageWrapper.payload);
        } catch (error) {
          console.error('Unable to deserialize Movie[] object: %s',
            messageWrapper.payload);
          return;
        }

        console.debug('Movies message received: %o', movies);
        this.movieListResponseSubject.next(movies);
        break;

      case MessageType.MOVIE_ROOM_RESPONSE:
        let room: MovieRoom;
        try {
          room = JSON.parse(messageWrapper.payload);
        } catch (error) {
          console.error('Unable to deserialize MovieRoom object: %s',
            messageWrapper.payload);
          return;
        }

        console.debug('Room received: %o', room);
        this.movieRoomResponseSubject.next(room);
        break;

      case MessageType.MOVIE_ROOM_UPDATE:
        let roomUpdated: MovieRoom;
        try {
          roomUpdated = JSON.parse(messageWrapper.payload);
        } catch (error) {
          console.error('Unable to deserialize MovieRoom object: %s',
            messageWrapper.payload);
          return;
        }

        console.debug('Room received: %o', roomUpdated);
        this.movieRoomUpdateSubject.next(roomUpdated);
        break;

      default: break;

    }
  }

  private validateAndGetMessage(messageReceived: string) {
    let messageWrapper: MessageWrapper;
    try {
      messageWrapper = JSON.parse(messageReceived);
    } catch (error) {
      console.error('Unable to parse received JSON string: %s\n%o',
        messageReceived, error);
      return;
    }

    if (!messageWrapper.hasOwnProperty('type') ||
      !messageWrapper.hasOwnProperty('payload')) {
      console.error('Invalid message received, not the correct properties: %s',
        messageReceived);
      return;
    }

    return messageWrapper;
  }
}
