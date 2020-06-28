using System;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using StreamProviderWS.Managers;
using StreamProviderWS.Models.WebSocket;
using StreamProviderWS.Models.WebSocket.RequestsMessages;
using StreamProviderWS.Services;

namespace StreamProviderWS.WebSocketHandlers
{
    public abstract class WebSocketHandler
    {
        private readonly object lockRooms = new object();
        private readonly object lockRoomSockets = new object();
        private readonly object lockConnectionManager = new object();

        private readonly IRoomSocketsManager _roomSocketsManager;
        private readonly IRoomsProvider _roomsProvider;
        private readonly ConnectionManager _connectionManager;
        protected IRoomSocketsManager RoomSocketsManager
        {
            get
            {
                lock (lockRoomSockets)
                {
                    return _roomSocketsManager;
                }
            }
        }

        protected IRoomsProvider RoomsProvider
        {
            get
            {
                lock (lockRooms)
                {
                    return _roomsProvider;
                }
            }
        }

        protected ConnectionManager WebSocketConnectionManager
        {
            get
            {
                lock (lockConnectionManager)
                {
                    return _connectionManager;
                }
            }
        }

        protected WebSocketHandler(
            ConnectionManager webSocketConnectionManager,
            IRoomSocketsManager roomSocketsManager,
            IRoomsProvider roomsProvider)
        {
            _roomSocketsManager = roomSocketsManager;
            _roomsProvider = roomsProvider;
            _connectionManager = webSocketConnectionManager;
        }

        public virtual async Task OnConnected(WebSocket socket)
        {
            WebSocketConnectionManager.AddSocket(socket);

            var socketId = WebSocketConnectionManager.GetId(socket);
            var statusUpdate = new SocketStatusUpdate { IsConnected = true, SocketId = socketId };
            var jsonStatus = JsonConvert.SerializeObject(statusUpdate);

            MessageWrapper messageWrapper = new MessageWrapper
            {
                type = MessageType.SOCKET_STATUS,
                payload = jsonStatus
            };

            var json = JsonConvert.SerializeObject(messageWrapper);
            await SendMessageAsync(socket, json);
        }

        public virtual async Task OnDisconnected(WebSocket socket)
        {
            var socketId = WebSocketConnectionManager.GetId(socket);

            var roomSockets = RoomSocketsManager.GetBySocketId(socketId);
            if (roomSockets == null || roomSockets.Count == 0)
            {
                return;

            }

            var userId = roomSockets[0].UserSockets.FirstOrDefault()?.UserId;
            if (string.IsNullOrWhiteSpace(userId))
            {
                return;
            }

            var statusUpdate = new SocketStatusUpdate { IsConnected = false, SocketId = socketId, UserId = userId };
            var jsonStatus = JsonConvert.SerializeObject(statusUpdate);

            MessageWrapper messageWrapper = new MessageWrapper
            {
                type = MessageType.SOCKET_STATUS,
                payload = jsonStatus
            };

            var json = JsonConvert.SerializeObject(messageWrapper);
            await SendMessageAsync(socket, json);


            var tasks = roomSockets.Select(x => SendMessageToAllInRoomAsync(x.RoomId, json));
            await Task.WhenAll(tasks);

            await WebSocketConnectionManager.RemoveSocket(WebSocketConnectionManager.GetId(socket));

            var userRooms = await RoomsProvider.GetAllByUserId(userId);
            if (userRooms == null || !userRooms.Any())
            {
                return;
            }

            userRooms.ForEach(room =>
            {
                //var user = room.UsersInRoom.Select(x=>x.User).FirstOrDefault(x => x.id.Equals(userId));
                var userInRoom = room.UsersInRoom.FirstOrDefault(x => x.User.id.Equals(userId));
                if (userInRoom == null)
                {
                    return;
                }

                userInRoom.IsActive = false;

                RoomsProvider.Update(room.Id, room);
            });
        }

        public async Task SendMessageAsync(WebSocket socket, string message)
        {
            if (socket.State != WebSocketState.Open)
                return;

            await socket.SendAsync(buffer: new ArraySegment<byte>(array: Encoding.ASCII.GetBytes(message),
                                                                  offset: 0,
                                                                  count: message.Length),
                                   messageType: WebSocketMessageType.Text,
                                   endOfMessage: true,
                                   cancellationToken: CancellationToken.None);
        }

        public async Task SendMessageAsync(string socketId, string message)
        {
            await SendMessageAsync(WebSocketConnectionManager.GetSocketById(socketId), message);
        }

        public async Task SendMessageToAllAsync(string message)
        {
            var tasks = WebSocketConnectionManager.GetAll().Select(pair =>
            {
                if (pair.Value.State == WebSocketState.Open)
                    return SendMessageAsync(pair.Value, message);

                return Task.CompletedTask;
            });

            await Task.WhenAll(tasks);
        }

        public async Task SendMessageToAllInRoomAsync(string roomId, string message)
        {
            var roomSocket = RoomSocketsManager.GetAll().FirstOrDefault(x => x.RoomId.Equals(roomId));
            if (roomSocket == null)
            {
                throw new ArgumentException($"No room socket found for room id : {roomId}");
            }

            if (roomSocket.UserSockets == null || roomSocket.UserSockets.Count == 0)
            {
                return;
            }

            var tasks = roomSocket.UserSockets
                .Select(x => x.SocketId)
                .Select(socketId =>
                 {
                     var socket = WebSocketConnectionManager.GetSocketById(socketId);
                     if (socket == null)
                     {
                         RoomSocketsManager.DeleteBySocketId(socketId);
                         return Task.CompletedTask;
                     }

                     if (socket.State == WebSocketState.Open)
                     {
                         return SendMessageAsync(socket, message);
                     }
                     else
                     {
                         RoomSocketsManager.DeleteBySocketId(socketId);
                     }

                     return Task.CompletedTask;
                 });

            await Task.WhenAll(tasks);
        }


        public abstract Task ReceiveAsync(WebSocket socket, WebSocketReceiveResult result, byte[] buffer);
    }
}
