using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using StreamProviderWS.Managers;
using StreamProviderWS.Models.WebSocket;
using StreamProviderWS.Services;

namespace StreamProviderWS.WebSocketHandlers
{
    public class ChatHandler : WebSocketHandler
    {
        public ChatHandler(ConnectionManager webSocketConnectionManager, IRoomSocketsManager roomSocketsManager, IRoomsProvider roomsProvider)
            : base(webSocketConnectionManager, roomSocketsManager, roomsProvider)
        {
        }

        public override async Task OnConnected(WebSocket socket)
        {
            await base.OnConnected(socket);

            var socketId = WebSocketConnectionManager.GetId(socket);
            await SendMessageToAllAsync($"{socketId} is now connected");
        }

        public override async Task ReceiveAsync(WebSocket socket, WebSocketReceiveResult result, byte[] buffer)
        {
            var a = Encoding.UTF8.GetString(buffer, 0, result.Count);

            var socketId = WebSocketConnectionManager.GetId(socket);

            var messageWrapper = JsonConvert.DeserializeObject<MessageWrapper>(a);

            // todo: checkups

            switch (messageWrapper.type)
            {
                case ChatMessageType.SOCKET_EVENT_PEER_MESSAGE:
                    //console.log('Forward WebRTC peer message:', JSON.stringify(data));

                    await SendMessageToAllAsync(messageWrapper.payload);
                    //socket..emit('api/v1/webrtc/peermessage', data);
                    break;

                case ChatMessageType.SOCKET_EVENT_CONNECT_TO_ROOM:
                    //console.log(`Client ${ socket.id} connected to room`);

                    //await SendMessageToAllAsync($"\{ \"id\": {socketId} \}");
                    //socket.broadcast.emit('api/v1/webrtc/peer-connected', { id: socket.id });
                    break;

                default:
                    break;
            }

            var message = $"{socketId} said: {Encoding.UTF8.GetString(buffer, 0, result.Count)}";

            await SendMessageToAllAsync(message);
        }
    }
}
