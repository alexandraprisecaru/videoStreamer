using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StreamProviderWS.Models.WebSocket.RequestsMessages
{
    public class PeerMessage
    {
        public string By { get; set; }
        public string To { get; set; }
        public string RoomId { get; set; }
        public string Type { get; set; }
        public object Ice { get; set; }
        public object Sdp { get; set; }
    }
}
