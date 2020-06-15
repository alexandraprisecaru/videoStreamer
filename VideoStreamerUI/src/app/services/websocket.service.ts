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
import { MovieRoomPauseRequest } from '../entities/requests/movieRoomPauseRequest';
import { MovieRoomPlayRequest } from '../entities/requests/movieRoomPlayRequest';
import { MovieRoomSeekRequest } from '../entities/requests/movieRoomSeekRequest';
import { MovieRoomAction } from '../entities/movieRoomAction';
import { ChatMessage } from '../entities/chatMessage';
import { SendChatMessageRequest } from '../entities/requests/sendChatMessageRequest';
import { ChatMessagesRequest } from '../entities/requests/chatMessagesRequest';
import { MovieComment } from '../entities/movieComment';
import { MovieCommentsRequest } from '../entities/requests/movieCommentsRequest';
import { SendMovieCommentRequest } from '../entities/requests/sendMovieCommentRequest';
import { ConnectAudioRequest } from '../entities/requests/video/connectAudioRequest';
import { VideoInfo } from '../entities/videoInfo';
import { DisconnectAudioRequest } from '../entities/requests/video/disconnectAudioRequest';
import { DisconnectVideoRequest } from '../entities/requests/video/disconnectVideoRequest';
import { ConnectVideoRequest } from '../entities/requests/video/connectVideoRequest';
import { VideoInfoUpdates } from '../entities/responses/VideoInfoUpdates';

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

  private movieRoomPauseUpdateSubject: Subject<MovieRoom>;
  private movieRoomPlayUpdateSubject: Subject<MovieRoom>;
  private movieRoomSeekUpdateSubject: Subject<MovieRoom>;

  private chatMessagesReponseSubject: Subject<ChatMessage[]>;
  private chatMessageUpdateSubject: Subject<ChatMessage>;

  private commentsReponseSubject: Subject<MovieComment[]>;
  private commentUpdateSubject: Subject<MovieComment>;

  private videoInfoUpdatesSubject: Subject<VideoInfoUpdates>;

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

    this.movieRoomPauseUpdateSubject = new Subject<MovieRoom>();
    this.movieRoomPlayUpdateSubject = new Subject<MovieRoom>();
    this.movieRoomSeekUpdateSubject = new Subject<MovieRoom>();

    this.chatMessagesReponseSubject = new Subject<ChatMessage[]>();
    this.chatMessageUpdateSubject = new Subject<ChatMessage>();

    this.commentsReponseSubject = new Subject<MovieComment[]>();
    this.commentUpdateSubject = new Subject<MovieComment>();

    this.videoInfoUpdatesSubject = new Subject<VideoInfoUpdates>();
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

  public subscribeToMovieRoomPauseUpdates(observer: Observer<MovieRoom>): void {
    this.movieRoomPauseUpdateSubject.subscribe(observer);
  }

  public subscribeToMovieRoomPlayUpdates(observer: Observer<MovieRoom>): void {
    this.movieRoomPlayUpdateSubject.subscribe(observer);
  }

  public subscribeToMovieRoomSeekUpdates(observer: Observer<MovieRoom>): void {
    this.movieRoomSeekUpdateSubject.subscribe(observer);
  }

  public subscribeToChatMessagesReponses(observer: Observer<ChatMessage[]>): void {
    this.chatMessagesReponseSubject.subscribe(observer);
  }

  public subscribeToChatMessageUpdates(observer: Observer<ChatMessage>): void {
    this.chatMessageUpdateSubject.subscribe(observer);
  }

  public subscribeToMovieCommentsReponses(observer: Observer<MovieComment[]>): void {
    this.commentsReponseSubject.subscribe(observer);
  }

  public subscribeToMovieCommentUpdates(observer: Observer<MovieComment>): void {
    this.commentUpdateSubject.subscribe(observer);
  }

  public subscribeToVideoInfoUpdates(observer: Observer<VideoInfoUpdates>): void {
    this.videoInfoUpdatesSubject.subscribe(observer);
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

      self.authService.authState.subscribe((user) => {
        if (user !== undefined && user !== null) {
          self.user = user;
          self.handleMessage(jsonReceived);
        }
      })

    };;

    this.webSocket.onerror = function (messageEvent: MessageEvent) {
      console.error('WebSocket error observed: %o', messageEvent);
    };

    this.webSocket.onclose = function (closeEvent: CloseEvent) {
      console.info('WebSocket connection has been closed: %o', closeEvent);
    };
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

  public sendPauseRequest(roomId: string, currentTime: number): void {
    this.authService.authState.subscribe(user => {
      const request: MovieRoomPauseRequest = new MovieRoomPauseRequest(roomId, user.id, currentTime);
      const message: MessageWrapper = new MessageWrapper(MessageType.MOVIE_ROOM_PAUSE_REQUEST, request);

      this.sendMessage(this.webSocket, message);
    });
  }

  public sendPlayRequest(roomId: string, currentTime: number): void {
    this.authService.authState.subscribe(user => {
      const request: MovieRoomPlayRequest = new MovieRoomPlayRequest(roomId, user.id, currentTime);
      const message: MessageWrapper = new MessageWrapper(MessageType.MOVIE_ROOM_PLAY_REQUEST, request);

      this.sendMessage(this.webSocket, message);
    });
  }

  public sendSeekRequest(roomId: string, currentTime: number): void {
    this.authService.authState.subscribe(user => {
      const request: MovieRoomSeekRequest = new MovieRoomSeekRequest(roomId, user.id, currentTime);
      const message: MessageWrapper = new MessageWrapper(MessageType.MOVIE_ROOM_SEEK_REQUEST, request);

      this.sendMessage(this.webSocket, message);
    });
  }

  public sendChatMessagesRequest(roomId: string): void {
    this.authService.authState.subscribe(user => {
      const request: ChatMessagesRequest = new ChatMessagesRequest(roomId, user.id);
      const message: MessageWrapper = new MessageWrapper(MessageType.CHAT_MESSAGES_REQUEST, request);

      this.sendMessage(this.webSocket, message);
    });
  }

  public sendChatMessageRequest(roomId: string, chatMessage: ChatMessage): void {
    this.authService.authState.subscribe(user => {
      if (user) {
        chatMessage.User = user
        const request: SendChatMessageRequest = new SendChatMessageRequest(roomId, user.id, chatMessage);
        const message: MessageWrapper = new MessageWrapper(MessageType.SEND_CHAT_MESSAGE_REQUEST, request);

        this.sendMessage(this.webSocket, message);
      }
    });
  }

  public sendMovieCommentsRequest(movieId: string): void {
    const request: MovieCommentsRequest = new MovieCommentsRequest(movieId);
    const message: MessageWrapper = new MessageWrapper(MessageType.MOVIE_COMMENTS_REQUEST, request);

    this.sendMessage(this.webSocket, message);
  }

  public sendMovieCommentRequest(movieId: string, comment: MovieComment): void {
    this.authService.authState.subscribe(user => {
      if (user) {
        const request: SendMovieCommentRequest = new SendMovieCommentRequest(movieId, comment);
        const message: MessageWrapper = new MessageWrapper(MessageType.SEND_MOVIE_COMMENT_REQUEST, request);

        this.sendMessage(this.webSocket, message);
      }
    });
  }

  public sendConnectAudioRequest(videoInfo: VideoInfo): void {
    const request: ConnectAudioRequest = new ConnectAudioRequest(videoInfo);
    const message: MessageWrapper = new MessageWrapper(MessageType.CONNECT_AUDIO_REQUEST, request);

    this.sendMessage(this.webSocket, message);
  }

  public sendDisconnectAudioRequest(videoInfo: VideoInfo): void {
    const request: DisconnectAudioRequest = new DisconnectAudioRequest(videoInfo);
    const message: MessageWrapper = new MessageWrapper(MessageType.DISCONNECT_AUDIO_REQUEST, request);

    this.sendMessage(this.webSocket, message);
  }

  public sendConnectVideoRequest(videoInfo: VideoInfo): void {
    const request: ConnectVideoRequest = new ConnectVideoRequest(videoInfo);
    const message: MessageWrapper = new MessageWrapper(MessageType.CONNECT_VIDEO_REQUEST, request);

    this.sendMessage(this.webSocket, message);
  }

  public sendDisconnectVideoRequest(videoInfo: VideoInfo): void {
    const request: DisconnectVideoRequest = new DisconnectVideoRequest(videoInfo);
    const message: MessageWrapper = new MessageWrapper(MessageType.DISCONNECT_VIDEO_REQUEST, request);

    this.sendMessage(this.webSocket, message);
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
          console.error('Movie list reponse: Unable to deserialize Movie[] object: %s',
            messageWrapper.payload);
          return;
        }

        console.debug('Movies message received: %o', movies);
        this.movieListResponseSubject.next(movies);
        break;

      case MessageType.MOVIE_ROOMS_RESPONSE:
        let rooms: MovieRoom[];
        try {
          rooms = JSON.parse(messageWrapper.payload);
        } catch (error) {
          console.error('Room reponse: Unable to deserialize MovieRoom object: %s',
            messageWrapper.payload);
          return;
        }

        console.debug('Room received: %o', rooms);
        this.movieRoomsResponseSubject.next(rooms);
        break;

      case MessageType.MOVIE_ROOMS_UPDATE:
        let roomsUpdated: MovieRoom[];
        try {
          roomsUpdated = JSON.parse(messageWrapper.payload);
        } catch (error) {
          console.error('Room reponse: Unable to deserialize MovieRoom object: %s',
            messageWrapper.payload);
          return;
        }

        console.debug('Room received: %o', roomsUpdated);
        this.movieRoomsUpdateSubject.next(roomsUpdated);
        break;


      case MessageType.MOVIE_ROOM_RESPONSE:
        let room: MovieRoom;
        try {
          room = JSON.parse(messageWrapper.payload);
        } catch (error) {
          console.error('Room reponse: Unable to deserialize MovieRoom object: %s',
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
          console.error('Room update: Unable to deserialize MovieRoom object: %s',
            messageWrapper.payload);
          return;
        }

        console.debug('Room received: %o', roomUpdated);
        this.movieRoomUpdateSubject.next(roomUpdated);
        break;

      case MessageType.MOVIE_ROOM_PLAY_UPDATE:
        let roomActionPlay: MovieRoomAction;
        try {
          roomActionPlay = JSON.parse(messageWrapper.payload);
        } catch (error) {
          console.error('Play video: Unable to deserialize MovieRoomAction object: %s',
            messageWrapper.payload);
          return;
        }

        if (roomActionPlay.UserId === this.user.id) {
          return;
        }

        console.debug('Room received: %o', roomActionPlay.Room);
        this.movieRoomPlayUpdateSubject.next(roomActionPlay.Room);
        break;

      case MessageType.MOVIE_ROOM_PAUSE_UPDATE:
        let roomActionPause: MovieRoomAction;
        try {
          roomActionPause = JSON.parse(messageWrapper.payload);
        } catch (error) {
          console.error('Pause video: Unable to deserialize MovieRoomAction object: %s',
            messageWrapper.payload);
          return;
        }

        if (roomActionPause.UserId === this.user.id) {
          return;
        }

        console.debug('Room received: %o', roomActionPause.Room);
        this.movieRoomPauseUpdateSubject.next(roomActionPause.Room);
        break;

      case MessageType.MOVIE_ROOM_SEEK_UPDATE:
        let roomActionSeek: MovieRoomAction;
        try {
          roomActionSeek = JSON.parse(messageWrapper.payload);
        } catch (error) {
          console.error('Seek video: Unable to deserialize MovieRoomAction object: %s',
            messageWrapper.payload);
          return;
        }

        if (roomActionSeek.UserId === this.user.id) {
          return;
        }

        console.debug('Room received: %o', roomActionSeek.Room);
        this.movieRoomSeekUpdateSubject.next(roomActionSeek.Room);
        break;

      case MessageType.CHAT_MESSAGES_RESPONSE:
        let messages: ChatMessage[];
        try {
          messages = JSON.parse(messageWrapper.payload);
        } catch (error) {
          console.error('Get chat messages response: Unable to deserialize ChatMessage[] object: %s',
            messageWrapper.payload);
          return;
        }

        console.debug('Chat Message received: %o', messages);
        this.chatMessagesReponseSubject.next(messages);
        break;

      case MessageType.CHAT_MESSAGE_UPDATE:
        let message: ChatMessage;
        try {
          message = JSON.parse(messageWrapper.payload);
        } catch (error) {
          console.error('Get chat message rupdate : Unable to deserialize ChatMessage object: %s',
            messageWrapper.payload);
          return;
        }

        if (message.User.id === this.user.id) {
          // if the message was sent by the current user, exit
          return;
        }

        console.debug('Chat Message received: %o', message);
        this.chatMessageUpdateSubject.next(message);
        break;

      case MessageType.MOVIE_COMMENTS_RESPONSE:
        let comments: MovieComment[];
        try {
          comments = JSON.parse(messageWrapper.payload);
        } catch (error) {
          console.error('Get movie comments response: Unable to deserialize MovieComment[] object: %s',
            messageWrapper.payload);
          return;
        }

        console.debug('Movie comments received: %o', comments);
        this.commentsReponseSubject.next(comments);
        break;

      case MessageType.MOVIE_COMMENT_UPDATE:
        let comment: MovieComment;
        try {
          comment = JSON.parse(messageWrapper.payload);
        } catch (error) {
          console.error('Get movie comment update : Unable to deserialize MovieComment object: %s',
            messageWrapper.payload);
          return;
        }

        if (comment.User.id === this.user.id) {
          // if the message was sent by the current user, exit
          return;
        }

        console.debug('Chat Message received: %o', comment);
        this.commentUpdateSubject.next(comment);
        break;


      case MessageType.VIDEO_INFO_UPDATE:
        let videoInfoUpdate: VideoInfoUpdates;
        try {
          videoInfoUpdate = JSON.parse(messageWrapper.payload);
        } catch (error) {
          console.error('Get videoInfo updates : Unable to deserialize VideoInfoUpdates object: %s',
            messageWrapper.payload);
          return;
        }

        console.debug('VideoInfoUpdates received: %o', videoInfoUpdate);
        this.videoInfoUpdatesSubject.next(videoInfoUpdate);
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
