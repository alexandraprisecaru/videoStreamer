namespace StreamProviderWS.Models.WebSocket
{
    public class MessageType
    {
        public const string SAVE_USER_REQUEST = "SAVE_USER_REQUEST";

        public const string MOVIE_LIST_REQUEST = "MOVIE_LIST_REQUEST";
        public const string MOVIE_LIST_RESPONSE = "MOVIE_LIST_RESPONSE";
        public const string MOVIE_LIST_UPDATE = "MOVIE_LIST_UPDATE";

        public const string MOVIE_ROOMS_REQUEST = "MOVIE_ROOMS_REQUEST";
        public const string MOVIE_ROOMS_RESPONSE = "MOVIE_ROOMS_RESPONSE";
        public const string MOVIE_ROOMS_UPDATE = "MOVIE_ROOMS_UPDATE";

        public const string MOVIE_ROOM_PAUSE_REQUEST = "MOVIE_ROOM_PAUSE_REQUEST";
        public const string MOVIE_ROOM_PAUSE_UPDATE = "MOVIE_ROOM_PAUSE_UPDATE";

        public const string MOVIE_ROOM_PLAY_REQUEST = "MOVIE_ROOM_PLAY_REQUEST";
        public const string MOVIE_ROOM_PLAY_UPDATE = "MOVIE_ROOM_PLAY_UPDATE";
        
        public const string MOVIE_ROOM_SEEK_REQUEST = "MOVIE_ROOM_SEEK_REQUEST";
        public const string MOVIE_ROOM_SEEK_UPDATE = "MOVIE_ROOM_SEEK_UPDATE";

        public const string MOVIE_ROOM_REQUEST = "MOVIE_ROOM_REQUEST";
        public const string MOVIE_ROOM_WITH_ID_REQUEST = "MOVIE_ROOM_WITH_ID_REQUEST";
        public const string MOVIE_ROOM_RESPONSE = "MOVIE_ROOM_RESPONSE";
        public const string MOVIE_ROOM_UPDATE = "MOVIE_ROOM_UPDATE";
        
        public const string MOVIE_STREAM_REQUEST = "MOVIE_STREAM_REQUEST";
        public const string MOVIE_STREAM_RESPONSE = "MOVIE_STREAM_RESPONSE";
        public const string MOVIE_STREAM_UPDATE = "MOVIE_STREAM_UPDATE";
        
        public const string MOVIE_COMMENTS_REQUEST = "MOVIE_COMMENTS_REQUEST";
        public const string MOVIE_COMMENTS_RESPONSE = "MOVIE_COMMENTS_RESPONSE";
        public const string MOVIE_COMMENTS_UPDATE = "MOVIE_COMMENTS_UPDATE";
        
        public const string MOVIE_ADD_COMMENT_REQUEST = "MOVIE_ADD_COMMENT_REQUEST";
        public const string MOVIE_ADD_COMMENT_UPDATE = "MOVIE_COMMENTS_UPDATE"; // is it needed?
        
        public const string MOVIE_CHAT_REQUEST = "MOVIE_CHAT_REQUEST";
        public const string MOVIE_CHAT_RESPONSE = "MOVIE_CHAT_RESPONSE";
        public const string MOVIE_CHAT_UPDATE = "MOVIE_CHAT_UPDATE";
        
        public const string MOVIE_SEND_CHAT_MESSAGE_REQUEST = "MOVIE_SEND_CHAT_MESSAGE_REQUEST";
        public const string MOVIE_GET_CHAT_MESSAGE_RESPONSE = "MOVIE_GET_CHAT_MESSAGE_RESPONSE";

        public const string MOVIE_PAUSE_REQUEST = "MOVIE_PAUSE_REQUEST";
        public const string MOVIE_PAUSE_RESPONSE = "MOVIE_PAUSE_RESPONSE";

        public const string MOVIE_CLOSE_REQUEST = "MOVIE_CLOSE_REQUEST";
        public const string MOVIE_CLOSE_RESPONSE = "MOVIE_CLOSE_RESPONSE";
        
        // hmm............... idk if personal is needed or doable in the current implementation
        public const string MOVIE_CLOSE_PERSONAL_REQUEST = "MOVIE_CLOSE_PERSONAL_REQUEST";
        public const string MOVIE_CLOSE_PERSONAL_RESPONSE = "MOVIE_CLOSE_PERSONAL_RESPONSE";
    }
}
