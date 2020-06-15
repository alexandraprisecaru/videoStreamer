using System.Collections.Generic;

namespace StreamProviderWS.Models.WebSocket
{
    public class UserSocket
    {
        public string UserId { get; set; }
        public string SocketId { get; set; }
    }

    public class RoomSockets
    {
        public string RoomId { get; set; }
        public List<UserSocket> UserSockets { get; set; }
    }
}
