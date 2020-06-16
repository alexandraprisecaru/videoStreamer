using StreamProviderWS.Models.Common;

namespace StreamProviderWS.Models.WebSocket.RequestsMessages
{
    public class ConnectToRoom
    {
        public string SocketId { get; set; }
        public VideoInfo VideoInfo { get; set; }
        public User User { get; set; }
    }
}
