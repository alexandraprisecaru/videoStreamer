using StreamProviderWS.Models.Common;

namespace StreamProviderWS.Models.WebSocket.RequestsMessages
{
    public class PeerMessage
    {
        public string By { get; set; }
        public string To { get; set; }
        public string RoomId { get; set; }
        public string Type { get; set; }
        public User User { get; set; }
        public object Ice { get; set; }
        public object Sdp { get; set; }
    }
}
