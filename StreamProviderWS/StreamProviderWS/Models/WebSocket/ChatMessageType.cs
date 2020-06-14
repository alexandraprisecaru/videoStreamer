namespace StreamProviderWS.Models.WebSocket
{
    public class ChatMessageType
    {
        public const string SOCKET_EVENT_PEER_CONNECTED = "api/v1/webrtc/peer-connected";
        public const string SOCKET_EVENT_PEER_DISCONNECTED = "api/v1/webrtc/peer-disconnected";
        public const string SOCKET_EVENT_PEER_MESSAGE = "api/v1/webrtc/peermessage";
        public const string SOCKET_EVENT_CONNECT_TO_ROOM = "api/v1/webrtc/connect-to-chat";
        public const string RTC_PEER_MESSAGE_SDP_OFFER = "sdp-offer";
        public const string RTC_PEER_MESSAGE_SDP_ANSWER = "sdp-answer";
        public const string RTC_PEER_MESSAGE_ICE = "ice";
    }
}
