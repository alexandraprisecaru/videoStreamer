using StreamProviderWS.Models.Common;

namespace StreamProviderWS.Models.WebSocket
{
    public class MovieRoomAction
    {
        public MovieRoom Room { get; set; }
        public string UserId { get; set; }
    }
}
