using StreamProviderWS.Models.Common;

namespace StreamProviderWS.Models.WebSocket.RequestsMessages
{
    public class SendMovieCommentRequest
    {
        public string MovieId { get; set; }

        public MovieComment MovieComment { get; set; }
        
    }
}
