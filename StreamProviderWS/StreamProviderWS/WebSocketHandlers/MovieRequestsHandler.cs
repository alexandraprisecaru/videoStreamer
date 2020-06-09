﻿using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using StreamProviderWS.Managers;
using StreamProviderWS.Models.Common;
using StreamProviderWS.Models.WebSocket;
using StreamProviderWS.Models.WebSocket.RequestsMessages;
using StreamProviderWS.Services;

namespace StreamProviderWS.WebSocketHandlers
{
    public class MovieRequestsHandler : WebSocketHandler
    {
        private readonly IProvider<Movie> _movieProvider;
        private readonly IProvider<User> _userProvider;
        private readonly IRoomsProvider _roomsProvider;
        private readonly IChatMessagesProvider _chatMessagesProvider;

        public MovieRequestsHandler(
            ConnectionManager webSocketConnectionManager,
            IProvider<Movie> movieProvider,
            IProvider<User> userProvider,
            IRoomsProvider roomsProvider,
            IChatMessagesProvider chatMessagesProvider)
            : base(webSocketConnectionManager)
        {
            _movieProvider = movieProvider;
            _userProvider = userProvider;
            _roomsProvider = roomsProvider;
            _chatMessagesProvider = chatMessagesProvider;
        }

        public override async Task ReceiveAsync(WebSocket socket, WebSocketReceiveResult result, byte[] buffer)
        {
            var socketId = WebSocketConnectionManager.GetId(socket);

            var a = Encoding.UTF8.GetString(buffer, 0, result.Count);

            var messageWrapper = JsonConvert.DeserializeObject<MessageWrapper>(a);

            // todo: checkups

            switch (messageWrapper.type)
            {
                case MessageType.SAVE_USER_REQUEST:
                    await HandleSaveUserRequest(messageWrapper);
                    break;

                case MessageType.MOVIE_LIST_REQUEST:
                    await HandleMovieListRequest(socket, messageWrapper);
                    break;

                case MessageType.MOVIE_ROOM_REQUEST:
                    await HandleMovieRoomRequest(socket, messageWrapper);
                    break;

                case MessageType.MOVIE_ROOM_WITH_ID_REQUEST:
                    await HandleMovieRoomWithIdRequest(socket, messageWrapper);
                    break;

                case MessageType.MOVIE_ROOM_PAUSE_REQUEST:
                    await HandleMovieRoomPauseRequest(messageWrapper);
                    break;

                case MessageType.MOVIE_ROOM_PLAY_REQUEST:
                    await HandleMovieRoomPlayRequest(messageWrapper);
                    break;

                case MessageType.MOVIE_ROOM_SEEK_REQUEST:
                    await HandleMovieRoomSeekRequest(messageWrapper);
                    break;

                case MessageType.MOVIE_ROOMS_REQUEST:
                    //HandleMovieRoomsRequest(messageWrapper);
                    break;

                case MessageType.CHAT_MESSAGES_REQUEST:
                    await HandleChatMessagesRequest(socket, messageWrapper);
                    break;

                case MessageType.SEND_CHAT_MESSAGE_REQUEST:
                    await HandleSendChatMessageRequest(messageWrapper);
                    break;

                default:
                    break;
            }
        }

        private async Task HandleSaveUserRequest(MessageWrapper messageWrapper)
        {
            var saveUserRequest = JsonConvert.DeserializeObject<SaveUserRequest>(messageWrapper.payload);
            if (saveUserRequest?.User == null)
            {
                return;
            }

            await _userProvider.Add(saveUserRequest.User);
        }

        private async Task HandleMovieListRequest(WebSocket socket, MessageWrapper messageWrapper)
        {
            var movies = await _movieProvider.GetAll();
            var jsonMovies = JsonConvert.SerializeObject(movies);
            var messageResponseWrapper = new MessageWrapper
            {
                type = MessageType.MOVIE_LIST_RESPONSE,
                payload = jsonMovies
            };

            var json = JsonConvert.SerializeObject(messageResponseWrapper);

            await SendMessageAsync(socket, json);
        }

        private async Task HandleMovieRoomRequest(WebSocket socket, MessageWrapper messageWrapper)
        {
            var movieRoomRequest = JsonConvert.DeserializeObject<MovieRoomRequest>(messageWrapper.payload);
            if (movieRoomRequest?.MovieId == null)
            {
                return;
            }

            var room = await _roomsProvider.CreateRoom(movieRoomRequest.MovieId, movieRoomRequest.UserId);
            var jsonRoom = JsonConvert.SerializeObject(room);

            var messageResponseWrapper = new MessageWrapper
            {
                type = MessageType.MOVIE_ROOM_RESPONSE,
                payload = jsonRoom
            };

            var json = JsonConvert.SerializeObject(messageResponseWrapper);

            await SendMessageAsync(socket, json);
        }

        private async Task HandleMovieRoomWithIdRequest(WebSocket socket, MessageWrapper messageWrapper)
        {
            var movieRoomRequest = JsonConvert.DeserializeObject<MovieRoomWithIdRequest>(messageWrapper.payload);
            if (movieRoomRequest?.RoomId == null)
            {
                return;
            }

            var room = await _roomsProvider.GetById(movieRoomRequest.RoomId);

            // todo: check room
            if (room == null)
            {
                return;
            }

            var userId = movieRoomRequest.UserId;

            var wasUpdated = false;
            // todo: check user id
            if (!room.Users.Any(u => u.Id.Equals(userId)))
            {
                var user = await _userProvider.GetById(userId);

                // todo: check user

                room.Users.Add(user);
                wasUpdated = await _roomsProvider.Update(room);
            }

            var jsonRoom = JsonConvert.SerializeObject(room);

            var messageResponseWrapper = new MessageWrapper
            {
                type = MessageType.MOVIE_ROOM_RESPONSE,
                payload = jsonRoom
            };

            var json = JsonConvert.SerializeObject(messageResponseWrapper);

            await SendMessageAsync(socket, json);

            if (wasUpdated)
            {
                messageResponseWrapper = new MessageWrapper
                {
                    type = MessageType.MOVIE_ROOM_UPDATE,
                    payload = jsonRoom
                };

                json = JsonConvert.SerializeObject(messageResponseWrapper);
                await SendMessageToAllAsync(json);
            }
        }

        private async Task HandleMovieRoomPauseRequest(MessageWrapper messageWrapper)
        {
            var jsonRoomAndUser = await UpdateRoomAsync(messageWrapper);
            if (jsonRoomAndUser == null)
            {
                return;
            }

            var messageResponseWrapper = new MessageWrapper
            {
                type = MessageType.MOVIE_ROOM_PAUSE_UPDATE,
                payload = jsonRoomAndUser
            };

            var json = JsonConvert.SerializeObject(messageResponseWrapper);

            await SendMessageToAllAsync(json);
        }

        private async Task HandleMovieRoomPlayRequest(MessageWrapper messageWrapper)
        {
            var jsonRoomAndUser = await UpdateRoomAsync(messageWrapper);
            if (jsonRoomAndUser == null)
            {
                return;
            }

            var messageResponseWrapper = new MessageWrapper
            {
                type = MessageType.MOVIE_ROOM_PLAY_UPDATE,
                payload = jsonRoomAndUser
            };

            var json = JsonConvert.SerializeObject(messageResponseWrapper);

            await SendMessageToAllAsync(json);
        }

        private async Task HandleMovieRoomSeekRequest(MessageWrapper messageWrapper)
        {
            var jsonRoomAndUser = await UpdateRoomAsync(messageWrapper);
            if (jsonRoomAndUser == null)
            {
                return;
            }

            var messageResponseWrapper = new MessageWrapper
            {
                type = MessageType.MOVIE_ROOM_SEEK_UPDATE,
                payload = jsonRoomAndUser
            };

            var json = JsonConvert.SerializeObject(messageResponseWrapper);

            await SendMessageToAllAsync(json);
        }


        private async Task HandleChatMessagesRequest(WebSocket socket, MessageWrapper messageWrapper)
        {
            var request = JsonConvert.DeserializeObject<ChatMessagesRequest>(messageWrapper.payload);
            if (request?.RoomId == null)
            {
                return;
            }

            var room = await _roomsProvider.GetById(request.RoomId);

            // todo: check room
            if (room == null)
            {
                return;
            }

            var userId = request.UserId;

            var wasUpdated = false;
            // todo: check user id
            if (!room.Users.Any(u => u.Id.Equals(userId)))
            {
                // the messages request was not sent by someone in the same room
                return;
            }

            var messages = await _chatMessagesProvider.GetAllByRoomId(request.RoomId);

            var jsonMessages = JsonConvert.SerializeObject(messages);

            var messageResponseWrapper = new MessageWrapper
            {
                type = MessageType.CHAT_MESSAGES_RESPONSE,
                payload = jsonMessages
            };

            var json = JsonConvert.SerializeObject(messageResponseWrapper);

            await SendMessageAsync(socket, json);
        }


        private async Task HandleSendChatMessageRequest(MessageWrapper messageWrapper)
        {
            var request = JsonConvert.DeserializeObject<SendChatMessageRequest>(messageWrapper.payload);
            if (request?.RoomId == null)
            {
                return;
            }

            var room = await _roomsProvider.GetById(request.RoomId);

            // todo: check room
            if (room == null)
            {
                return;
            }

            var userId = request.UserId;

            var wasUpdated = false;
            // todo: check user id
            if (!room.Users.Any(u => u.Id.Equals(userId)))
            {
                // the messages was not sent by someone in the same room
                return;
            }

            await _chatMessagesProvider.Add(request.ChatMessage);

            var jsonMessage = JsonConvert.SerializeObject(request.ChatMessage);

            var messageResponseWrapper = new MessageWrapper
            {
                type = MessageType.CHAT_MESSAGE_UPDATE,
                payload = jsonMessage
            };

            var json = JsonConvert.SerializeObject(messageResponseWrapper);

            await SendMessageToAllAsync(json);
        }


        private async Task<string> UpdateRoomAsync(MessageWrapper messageWrapper)
        {
            var request = JsonConvert.DeserializeObject<MovieRoomVideoUpdateRequest>(messageWrapper.payload);
            if (request?.RoomId == null)
            {
                return null;
            }

            var room = await _roomsProvider.GetById(request.RoomId);
            if (room == null)
            {
                // wtf 
                // todo: treat this case, send error or smth

                return null;
            }

            room.TimeWatched = request.CurrentTime;

            await _roomsProvider.Update(room);

            var movieRoomAction = new MovieRoomAction { Room = room, UserId = request.UserId };
            return JsonConvert.SerializeObject(movieRoomAction);
        }
    }
}
