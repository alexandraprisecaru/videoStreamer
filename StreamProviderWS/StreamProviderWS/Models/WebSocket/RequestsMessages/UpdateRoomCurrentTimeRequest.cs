namespace StreamProviderWS.Models.WebSocket.RequestsMessages
{
    public class UpdateRoomCurrentTimeRequest
    {
        public string RoomId { get; set; }
        public double CurrentTime { get; set; }
    }
}
