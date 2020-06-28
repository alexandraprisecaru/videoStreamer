namespace StreamProviderWS.Models.WebSocket.RequestsMessages
{
    public class LeaveRoomRequest
    {
        public string UserId { get; set; }
        public string RoomId { get; set; }
    }
}
