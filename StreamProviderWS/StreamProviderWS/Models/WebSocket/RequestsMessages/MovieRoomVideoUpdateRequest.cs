namespace StreamProviderWS.Models.WebSocket.RequestsMessages
{
    public class MovieRoomVideoUpdateRequest
    {
        public string RoomId { get; set; }

        public string UserId { get; set; }

        public double CurrentTime { get; set; }
    }
}
