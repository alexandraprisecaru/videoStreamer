using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using StreamProviderWS.Managers;
using StreamProviderWS.Models;
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
        private readonly IChatMessagesProvider _chatMessagesProvider;
        private readonly IMovieCommentsProvider _commentsProvider;

        public MovieRequestsHandler(
            ConnectionManager webSocketConnectionManager,
            IProvider<Movie> movieProvider,
            IProvider<User> userProvider,
            IRoomsProvider roomsProvider,
            IChatMessagesProvider chatMessagesProvider,
            IMovieCommentsProvider commentsProvider,
            IRoomSocketsManager roomSocketsManager)
            : base(webSocketConnectionManager, roomSocketsManager, roomsProvider)
        {
            _movieProvider = movieProvider;
            _userProvider = userProvider;
            _chatMessagesProvider = chatMessagesProvider;
            _commentsProvider = commentsProvider;
        }

        public override async Task ReceiveAsync(WebSocket socket, WebSocketReceiveResult result, byte[] buffer)
        {
            try
            {
                var input = Encoding.UTF8.GetString(buffer, 0, result.Count);
                var messageWrapper = JsonConvert.DeserializeObject<MessageWrapper>(input);

                switch (messageWrapper.type)
                {

                    case MessageType.MOVIE_ROOMS_REQUEST:
                        await HandleMovieRoomsRequest(socket, messageWrapper);
                        break;

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

                    case MessageType.LEAVE_ROOM:
                        await HandleLeaveRoomRequest(messageWrapper);
                        break;
                    default:
                        break;
                }
            }
            catch (Exception exception)
            {

            }
        }

        private async Task HandleLeaveRoomRequest(MessageWrapper messageWrapper)
        {
            var request = JsonConvert.DeserializeObject<LeaveRoomRequest>(messageWrapper.payload);
            if (request == null || string.IsNullOrWhiteSpace(request.RoomId) ||
                string.IsNullOrWhiteSpace(request.UserId))
            {
                throw new ArgumentException("Error while leaving room");
            }

            // set user as inactive in database
            var room = await RoomsProvider.GetById(request.RoomId);
            if (room == null)
            {
                throw new InvalidOperationException($"no room was found with id: {request.RoomId}");
            }

            var user = room.UsersInRoom.FirstOrDefault(x => x.User.id.Equals(request.UserId));
            if (user == null)
            {
                throw new InvalidOperationException(
                    $"no user was found in room {request.RoomId} with id: {request.UserId}");
            }

            user.IsActive = false;

            await RoomsProvider.Update(request.RoomId, room);

            // update the room-user-sockets in-memory list
            RoomSockets roomSockets = RoomSocketsManager.GetByRoomId(request.RoomId).FirstOrDefault();

            if (roomSockets == null)
            {
                throw new InvalidOperationException($"room sockets for {request.RoomId} is null or empty");
            }

            var socket = roomSockets.UserSockets.FirstOrDefault(x => x.UserId.Equals(request.UserId));
            if (socket == null)
            {
                throw new InvalidOperationException($"User socket associated to user :{request.UserId} is null");
            }

            roomSockets.UserSockets = roomSockets.UserSockets.Where(x => !x.UserId.Equals(request.UserId)).ToList();

            // send message to all room members to notify that user x has left the room
            var statusUpdate = new SocketStatusUpdate { IsConnected = false, SocketId = socket.SocketId, UserId = request.UserId };
            var jsonStatus = JsonConvert.SerializeObject(statusUpdate);

            MessageWrapper messageWrapperResponse = new MessageWrapper
            {
                type = MessageType.SOCKET_STATUS,
                payload = jsonStatus
            };

            var json = JsonConvert.SerializeObject(messageWrapperResponse);

            await Task.Run(async () => await SendMessageToAllInRoomAsync(request.RoomId, json));
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

            var rooms = await RoomsProvider.GetAllByUserId(request.UserId);
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

            var room = await RoomsProvider.CreateRoom(movieRoomRequest.MovieId, movieRoomRequest.UserId);
            var jsonRoom = JsonConvert.SerializeObject(room);
            var messageResponseWrapper = new MessageWrapper
            {
                type = MessageType.MOVIE_ROOM_RESPONSE,
                payload = jsonRoom
            };

            var json = JsonConvert.SerializeObject(messageResponseWrapper);

            await SendMessageAsync(socket, json);

            RoomSocketsManager.Add(new RoomSockets
            {
                RoomId = room.Id,
                UserSockets = new List<UserSocket>
                {
                    new UserSocket { UserId = movieRoomRequest.UserId, SocketId = socketId }
                }
            });

            await UpdateUserRoomsList(socket, movieRoomRequest.UserId);
        }

        private async Task UpdateUserRoomsList(WebSocket socket, string userId)
        {
            // update the user's list of rooms
            var allUserRooms = await RoomsProvider.GetAllByUserId(userId);
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

            var room = await RoomsProvider.GetById(movieRoomRequest.RoomId);
            if (room == null)
            {
                throw new InvalidOperationException($"Cannot connect to a room that doesn't exist: {movieRoomRequest.RoomId}");
            }

            var userId = movieRoomRequest.UserId;

            if (await CheckAndUpdateRoomSocket(userId, room.Id, socketId)) // room was updated in some way
            {
                var roomDB = await RoomsProvider.GetById(room.Id);
                var userDB = roomDB?.UsersInRoom.FirstOrDefault(x => x.User.id.Equals(userId));
                if (userDB != null)
                {
                    // in case the user exists in db (room users), set the user as inactive to update later
                    userDB.IsActive = false;
                    await RoomsProvider.Update(room.Id, roomDB);
                }
            }

            var wasUpdated = false;

            room = await RoomsProvider.GetById(room.Id);
            if (!room.UsersInRoom.Any(u => u.User.id.Equals(userId) && u.IsActive))
            {
                var user = await _userProvider.GetById(userId);
                if (user == null)
                {
                    throw new InvalidOperationException($"User with id: {userId} does not exist");
                }

                // check if user is in room
                var existentUser = room.UsersInRoom.FirstOrDefault(x => x.User.id.Equals(user.id));
                if (existentUser != null)
                {
                    // if he is, set him as active
                    existentUser.IsActive = true;
                }
                else
                {
                    // otherwise, add him
                    room.UsersInRoom.Add(new UserRoom { User = user, IsActive = true });
                }

                await RoomsProvider.Update(room.Id, room);
                wasUpdated = true;

                var roomSocket = RoomSocketsManager.GetByRoomId(room.Id).FirstOrDefault();
                if (roomSocket == null)
                {
                    roomSocket = new RoomSockets
                    {
                        RoomId = room.Id,
                        UserSockets = new List<UserSocket> {new UserSocket {UserId = userId, SocketId = socketId}}
                    };

                    RoomSocketsManager.Add(roomSocket);
                }

                var userSocket = roomSocket.UserSockets.FirstOrDefault(x => x.UserId.Equals(userId) && x.SocketId.Equals(socketId));
                if (userSocket == null)
                {
                    RoomSocketsManager.AddUserSocket(room.Id, new UserSocket { UserId = user.id, SocketId = socketId });
                }
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
                // let everyone in room know that another user joined
                messageResponseWrapper = new MessageWrapper
                {
                    type = MessageType.MOVIE_ROOM_UPDATE,
                    payload = jsonRoom
                };

                json = JsonConvert.SerializeObject(messageResponseWrapper);
                await SendMessageToAllInRoomAsync(room.Id, json);

                // Update the current user list of rooms
                var rooms = await RoomsProvider.GetAllByUserId(movieRoomRequest.UserId);
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

            var room = await RoomsProvider.GetById(request.RoomId);

            // todo: check room
            if (room == null)
            {
                return;
            }

            var userId = request.UserId;

            // todo: check user id
            if (!room.UsersInRoom.Select(x => x.User).Any(u => u.id.Equals(userId)))
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

            var room = await RoomsProvider.GetById(request.RoomId);

            // todo: check room
            if (room == null)
            {
                return;
            }

            var userId = request.UserId;

            // todo: check user id
            if (!room.UsersInRoom.Select(x => x.User).Any(u => u.id.Equals(userId)))
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

            var room = await RoomsProvider.GetById(request.RoomId);
            if (room == null)
            {
                // wtf 
                // todo: treat this case, send error or smth

                return null;
            }

            room.TimeWatched = request.CurrentTime;

            await RoomsProvider.Update(room.Id, room);

            var movieRoomAction = new MovieRoomAction { Room = room, UserId = request.UserId };
            return JsonConvert.SerializeObject(movieRoomAction);
        }

        private async Task<bool> CheckAndUpdateRoomSocket(string userId, string roomId, string socketId)
        {
            // check if room exists
            var roomSocket1 = RoomSocketsManager.GetByRoomId(roomId).FirstOrDefault();
            if (roomSocket1 == null)
            {
                // if not, create it
                RoomSocketsManager.Add(new RoomSockets
                {
                    RoomId = roomId,
                    UserSockets = new List<UserSocket> { new UserSocket { UserId = userId, SocketId = socketId } }
                });

                return true;
            }

            // check if the user is already in the room
            var userSocket1 = roomSocket1.UserSockets.FirstOrDefault(x => x.UserId.Equals(userId));
            if (userSocket1 == null)
            {
                // if not, add him
                roomSocket1.UserSockets.Add(new UserSocket
                {
                    UserId = userId,
                    SocketId = socketId
                });

                return true;
            }

            if (!userSocket1.SocketId.Equals(socketId))
            {
                var statusUpdate = new SocketStatusUpdate { IsConnected = false, SocketId = userSocket1.SocketId, UserId = userSocket1.UserId };
                var jsonStatus = JsonConvert.SerializeObject(statusUpdate);

                MessageWrapper messageWrapper = new MessageWrapper
                {
                    type = MessageType.SOCKET_STATUS,
                    payload = jsonStatus
                };

                var json = JsonConvert.SerializeObject(messageWrapper);
                await SendMessageToAllInRoomAsync(roomSocket1.RoomId, json);

                await WebSocketConnectionManager.RemoveSocket(userSocket1.SocketId);

                RoomSocketsManager.AddUserSocket(roomId, new UserSocket { UserId = userId, SocketId = socketId });
                return true;
            }

            return false;
        }
    }
}
