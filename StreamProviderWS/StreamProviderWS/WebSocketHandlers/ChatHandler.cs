using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using StreamProviderWS.Managers;
using StreamProviderWS.Models.WebSocket;

namespace StreamProviderWS.WebSocketHandlers
{
    public class ChatHandler : WebSocketHandler
    {
        public ChatHandler(ConnectionManager webSocketConnectionManager) : base(webSocketConnectionManager)
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
                    case ChatMessageType.RTC_PEER_MESSAGE_ICE:
                break;
            }

            var message = $"{socketId} said: {Encoding.UTF8.GetString(buffer, 0, result.Count)}";

            await SendMessageToAllAsync(message);
        }
    }
}
