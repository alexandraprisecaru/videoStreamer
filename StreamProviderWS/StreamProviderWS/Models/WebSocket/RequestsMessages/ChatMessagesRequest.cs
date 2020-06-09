namespace StreamProviderWS.Models.WebSocket.RequestsMessages
{
    public class ChatMessagesRequest
    {
        public string RoomId { get; set; }
        public string UserId { get; set; }
    }
}
