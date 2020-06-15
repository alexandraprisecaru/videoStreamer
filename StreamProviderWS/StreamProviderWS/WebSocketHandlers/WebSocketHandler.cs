using System;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using StreamProviderWS.Managers;
using StreamProviderWS.Services;

namespace StreamProviderWS.WebSocketHandlers
{
    public abstract class WebSocketHandler
    {
        private readonly IRoomSocketsManager _roomSocketsManager;
        protected ConnectionManager WebSocketConnectionManager { get; set; }

        public WebSocketHandler(ConnectionManager webSocketConnectionManager, IRoomSocketsManager roomSocketsManager)
        {
            _roomSocketsManager = roomSocketsManager;
            WebSocketConnectionManager = webSocketConnectionManager;
        }

        public virtual async Task OnConnected(WebSocket socket)
        {
            WebSocketConnectionManager.AddSocket(socket);
        }

        public virtual async Task OnDisconnected(WebSocket socket)
        {
            await WebSocketConnectionManager.RemoveSocket(WebSocketConnectionManager.GetId(socket));
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
            foreach (var pair in WebSocketConnectionManager.GetAll())
            {
                if (pair.Value.State == WebSocketState.Open)
                    await SendMessageAsync(pair.Value, message);
            }
        }

        public async Task SendMessageToAllInRoomAsync(string roomId, string message)
        {
            var socketIds = _roomSocketsManager.GetByRoomId(roomId)?.SelectMany(x => x.UserSockets)
                .Select(x => x.SocketId)
                .ToList();

            if (socketIds == null || socketIds.Count == 0)
            {
                return;
            }

            foreach (string socketId in socketIds)
            {
                var socket = WebSocketConnectionManager.GetSocketById(socketId);
                if (socket == null)
                {
                    _roomSocketsManager.DeleteBySocketId(socketId);
                    continue;
                }

                if (socket.State == WebSocketState.Open)
                {
                    await SendMessageAsync(socket, message);
                }
                else
                {
                    _roomSocketsManager.DeleteBySocketId(socketId);
                }
            }
        }


        //TODO - decide if exposing the message string is better than exposing the result and buffer
        public abstract Task ReceiveAsync(WebSocket socket, WebSocketReceiveResult result, byte[] buffer);
    }
}
