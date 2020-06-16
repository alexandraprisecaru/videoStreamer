﻿using StreamProviderWS.Models.Common;

namespace StreamProviderWS.Models.WebSocket.RequestsMessages
{
    public class StoppedVideoNotification
    {
        public User User { get; set; }
        public string RoomId { get; set; }
        public string SocketId { get; set; }
    }
}
