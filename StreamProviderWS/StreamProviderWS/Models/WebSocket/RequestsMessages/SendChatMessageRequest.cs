using StreamProviderWS.Models.Common;

namespace StreamProviderWS.Models.WebSocket.RequestsMessages
{
    public class SendChatMessageRequest
    {
        public string RoomId { get; set; }
        public string UserId { get; set; }
        public ChatMessage ChatMessage { get; set; }


    }
}
