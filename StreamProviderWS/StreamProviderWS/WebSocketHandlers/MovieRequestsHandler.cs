using System;
using System.Collections.Generic;
using System.Linq;
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
        private readonly IMovieCommentsProvider _commentsProvider;
        private readonly IRoomSocketsManager _roomSocketsManager;

        public MovieRequestsHandler(
            ConnectionManager webSocketConnectionManager,
            IProvider<Movie> movieProvider,
            IProvider<User> userProvider,
            IRoomsProvider roomsProvider,
            IChatMessagesProvider chatMessagesProvider,
            IMovieCommentsProvider commentsProvider,
            IRoomSocketsManager roomSocketsManager)
            : base(webSocketConnectionManager, roomSocketsManager)
        {
            _movieProvider = movieProvider;
            _userProvider = userProvider;
            _roomsProvider = roomsProvider;
            _chatMessagesProvider = chatMessagesProvider;
            _commentsProvider = commentsProvider;
            _roomSocketsManager = roomSocketsManager;
        }

        public override async Task ReceiveAsync(WebSocket socket, WebSocketReceiveResult result, byte[] buffer)
        {
            try
            {
                var a = Encoding.UTF8.GetString(buffer, 0, result.Count);
                var messageWrapper = JsonConvert.DeserializeObject<MessageWrapper>(a);

                // todo: checkups

                switch (messageWrapper.type)
                {
                    case MessageType.SAVE_USER_REQUEST:
                        await HandleSaveUserRequest(messageWrapper);
                        break;

                    case MessageType.MOVIE_LIST_REQUEST:
                        await HandleMovieListRequest(socket);
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
                        await HandleMovieRoomsRequest(socket, messageWrapper);
                        break;

                    case MessageType.CHAT_MESSAGES_REQUEST:
                        await HandleChatMessagesRequest(socket, messageWrapper);
                        break;

                    case MessageType.SEND_CHAT_MESSAGE_REQUEST:
                        await HandleSendChatMessageRequest(messageWrapper);
                        break;

                    case MessageType.MOVIE_COMMENTS_REQUEST:
                        await HandleMovieCommentsRequest(socket, messageWrapper);
                        break;

                    case MessageType.SEND_MOVIE_COMMENT_REQUEST:
                        await HandleSendMovieCommentRequest(messageWrapper);
                        break;

                    case MessageType.SOCKET_EVENT_CONNECT_TO_ROOM:
                        await HandleSocketConnectToRoomRequest(messageWrapper);
                        break;
                    case MessageType.SOCKET_EVENT_PEER_MESSAGE:
                        await HandleSocketPeerMessageRequest(messageWrapper);
                        break;
                    case MessageType.STOPPED_VIDEO_NOTIFICATION:
                        await HandleStoppedVideoNotification(messageWrapper);
                        break;       
                    case MessageType.STOPPED_AUDIO_NOTIFICATION:
                        await HandleStoppedAudioNotification(messageWrapper);
                        break;
                    default:
                        break;
                }
            }
            catch (Exception exception)
            {

            }
        }

        private async Task HandleStoppedVideoNotification(MessageWrapper messageWrapper)
        {
            var request = JsonConvert.DeserializeObject<StoppedMediaNotification>(messageWrapper.payload);
            if (request == null)
            {
                return;
            }

            var jsonMessage = JsonConvert.SerializeObject(request);
            var messageResponseWrapper = new MessageWrapper
            {
                type = MessageType.STOPPED_VIDEO_NOTIFICATION,
                payload = jsonMessage
            };

            var json = JsonConvert.SerializeObject(messageResponseWrapper);

            await SendMessageToAllInRoomAsync(request.RoomId, json);
        }

        private async Task HandleStoppedAudioNotification(MessageWrapper messageWrapper)
        {
            var request = JsonConvert.DeserializeObject<StoppedMediaNotification>(messageWrapper.payload);
            if (request == null)
            {
                return;
            }

            var jsonMessage = JsonConvert.SerializeObject(request);
            var messageResponseWrapper = new MessageWrapper
            {
                type = MessageType.STOPPED_AUDIO_NOTIFICATION,
                payload = jsonMessage
            };

            var json = JsonConvert.SerializeObject(messageResponseWrapper);

            await SendMessageToAllInRoomAsync(request.RoomId, json);
        }

        private async Task HandleSocketPeerMessageRequest(MessageWrapper messageWrapper)
        {
            var request = JsonConvert.DeserializeObject<PeerMessageRequest>(messageWrapper.payload);
            if (request?.PeerMessage == null)
            {
                return;
            }

            var jsonMessage = JsonConvert.SerializeObject(request.PeerMessage);
            var messageResponseWrapper = new MessageWrapper
            {
                type = MessageType.SOCKET_EVENT_PEER_MESSAGE,
                payload = jsonMessage
            };

            var json = JsonConvert.SerializeObject(messageResponseWrapper);

            await SendMessageToAllInRoomAsync(request.PeerMessage.RoomId, json);
        }

        private async Task HandleSocketConnectToRoomRequest(MessageWrapper messageWrapper)
        {
            var request = JsonConvert.DeserializeObject<ConnectToRoomRequest>(messageWrapper.payload);
            if (request?.ConnectToRoom == null)
            {
                return;
            }

            var jsonConnect = JsonConvert.SerializeObject(request.ConnectToRoom);
            var messageResponseWrapper = new MessageWrapper
            {
                type = MessageType.SOCKET_EVENT_PEER_CONNECTED,
                payload = jsonConnect
            };

            var json = JsonConvert.SerializeObject(messageResponseWrapper);

            await SendMessageToAllInRoomAsync(request.ConnectToRoom.VideoInfo.RoomId, json);
        }

        private async Task HandleMovieRoomsRequest(WebSocket socket, MessageWrapper messageWrapper)
        {
            var request = JsonConvert.DeserializeObject<MovieRoomsRequest>(messageWrapper.payload);
            if (request?.UserId == null)
            {
                return;
            }

            var rooms = await _roomsProvider.GetAllByUserId(request.UserId);
            if (rooms == null || rooms.Count == 0)
            {
                return;
            }

            var jsonRooms = JsonConvert.SerializeObject(rooms);
            var messageResponseWrapper = new MessageWrapper
            {
                type = MessageType.MOVIE_ROOMS_RESPONSE,
                payload = jsonRooms
            };

            var json = JsonConvert.SerializeObject(messageResponseWrapper);

            await SendMessageAsync(socket, json);
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

        private async Task HandleMovieListRequest(WebSocket socket)
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
            var socketId = WebSocketConnectionManager.GetId(socket);
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

            _roomSocketsManager.Add(new RoomSockets
            {
                RoomId = room.Id,
                UserSockets = new List<UserSocket>
                {
                    new UserSocket { UserId = movieRoomRequest.UserId, SocketId = socketId }
                }
            });

            // update the user's list of rooms
            var allUserRooms = await _roomsProvider.GetAllByUserId(movieRoomRequest.UserId);
            var jsonRooms = JsonConvert.SerializeObject(allUserRooms);

            var messageUpdateWrapper = new MessageWrapper
            {
                type = MessageType.MOVIE_ROOMS_UPDATE,
                payload = jsonRooms
            };

            var jsonUpdate = JsonConvert.SerializeObject(messageUpdateWrapper);

            await SendMessageAsync(socket, jsonUpdate);
        }

        private async Task HandleMovieRoomWithIdRequest(WebSocket socket, MessageWrapper messageWrapper)
        {
            var socketId = WebSocketConnectionManager.GetId(socket);
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

            await CheckAndUpdateRoomSocket(userId, room.Id, socketId);

            var wasUpdated = false;
            // todo: check user id
            if (!room.Users.Any(u => u.id.Equals(userId)))
            {
                var user = await _userProvider.GetById(userId);
                if (user == null)
                {
                    return;
                }

                room.Users.Add(user);
                await _roomsProvider.Update(room.Id, room);
                wasUpdated = true;

                _roomSocketsManager.AddUserSocket(room.Id, new UserSocket { UserId = user.id, SocketId = socketId });
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
                await SendMessageToAllInRoomAsync(room.Id, json);

                // Update user about the newly created room
                var rooms = await _roomsProvider.GetAllByUserId(movieRoomRequest.UserId);
                var jsonRooms = JsonConvert.SerializeObject(rooms);
                messageResponseWrapper = new MessageWrapper
                {
                    type = MessageType.MOVIE_ROOMS_UPDATE,
                    payload = jsonRooms
                };

                json = JsonConvert.SerializeObject(messageResponseWrapper);
                await SendMessageAsync(socket, json);
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

            var request = JsonConvert.DeserializeObject<MovieRoomVideoUpdateRequest>(messageWrapper.payload);
            await SendMessageToAllInRoomAsync(request.RoomId, json);
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

            var request = JsonConvert.DeserializeObject<MovieRoomVideoUpdateRequest>(messageWrapper.payload);
            await SendMessageToAllInRoomAsync(request.RoomId, json);
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

            var request = JsonConvert.DeserializeObject<MovieRoomVideoUpdateRequest>(messageWrapper.payload);
            await SendMessageToAllInRoomAsync(request.RoomId, json);
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

            // todo: check user id
            if (!room.Users.Any(u => u.id.Equals(userId)))
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

            // todo: check user id
            if (!room.Users.Any(u => u.id.Equals(userId)))
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

            await SendMessageToAllInRoomAsync(room.Id, json);
        }

        private async Task HandleMovieCommentsRequest(WebSocket socket, MessageWrapper messageWrapper)
        {
            var request = JsonConvert.DeserializeObject<MovieCommentsRequest>(messageWrapper.payload);
            if (request?.MovieId == null)
            {
                return;
            }

            var movie = await _movieProvider.GetById(request.MovieId);

            // todo: check movie
            if (movie == null)
            {
                return;
            }

            var comments = await _commentsProvider.GetByMovieId(request.MovieId);

            var jsonComments = JsonConvert.SerializeObject(comments);

            var commentsResponseWrapper = new MessageWrapper
            {
                type = MessageType.MOVIE_COMMENTS_RESPONSE,
                payload = jsonComments
            };

            var json = JsonConvert.SerializeObject(commentsResponseWrapper);

            await SendMessageAsync(socket, json);
        }

        private async Task HandleSendMovieCommentRequest(MessageWrapper messageWrapper)
        {
            var request = JsonConvert.DeserializeObject<SendMovieCommentRequest>(messageWrapper.payload);
            if (request?.MovieId == null)
            {
                return;
            }

            var movie = await _movieProvider.GetById(request.MovieId);

            // todo: check movie
            if (movie == null)
            {
                return;
            }

            await _commentsProvider.Add(request.MovieComment);

            var jsonComment = JsonConvert.SerializeObject(request.MovieComment);

            var commentResponseWrapper = new MessageWrapper
            {
                type = MessageType.MOVIE_COMMENT_UPDATE,
                payload = jsonComment
            };

            var json = JsonConvert.SerializeObject(commentResponseWrapper);

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

            await _roomsProvider.Update(room.Id, room);

            var movieRoomAction = new MovieRoomAction { Room = room, UserId = request.UserId };
            return JsonConvert.SerializeObject(movieRoomAction);
        }

        private async Task CheckAndUpdateRoomSocket(string userId, string roomId, string socketId)
        {
            var roomSocket = _roomSocketsManager.GetByUserId(userId)?.FirstOrDefault(x => x.RoomId.Equals(roomId));
            if (roomSocket == null)
            {
                _roomSocketsManager.Add(new RoomSockets
                {
                    RoomId = roomId,
                    UserSockets = new List<UserSocket> { new UserSocket { UserId = userId, SocketId = socketId } }
                });
            }
            else
            {
                var userSocket = roomSocket.UserSockets.FirstOrDefault(x => x.UserId.Equals(userId));
                if (userSocket == null)
                {
                    roomSocket.UserSockets.Add(new UserSocket { UserId = userId, SocketId = socketId });
                }
                else
                {
                    if (!userSocket.SocketId.Equals(socketId))
                    {
                        var statusUpdate = new SocketStatusUpdate { IsConnected = false, SocketId = userSocket.SocketId };
                        var jsonStatus = JsonConvert.SerializeObject(statusUpdate);

                        MessageWrapper messageWrapper = new MessageWrapper
                        {
                            type = MessageType.SOCKET_STATUS,
                            payload = jsonStatus
                        };

                        var json = JsonConvert.SerializeObject(messageWrapper);
                         await SendMessageToAllInRoomAsync(roomSocket.RoomId, json);

                        await WebSocketConnectionManager.RemoveSocket(userSocket.SocketId);
                        _roomSocketsManager.DeleteBySocketId(userSocket.SocketId);
                        _roomSocketsManager.AddUserSocket(roomId, new UserSocket { UserId = userId, SocketId = socketId });
                    }
                }
            }

        }
    }
}
