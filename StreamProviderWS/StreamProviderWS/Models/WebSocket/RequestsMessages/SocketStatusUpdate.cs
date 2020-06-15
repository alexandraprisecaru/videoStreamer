namespace StreamProviderWS.Models.WebSocket.RequestsMessages
{
    public class SocketStatusUpdate
    {
        public bool IsConnected { get; set; }
        public string SocketId { get; set; }
    }
}
