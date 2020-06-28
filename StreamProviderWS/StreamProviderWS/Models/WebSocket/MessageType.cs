﻿namespace StreamProviderWS.Models.WebSocket
{
    public class MessageType
    {
        public const string SAVE_USER_REQUEST = "SAVE_USER_REQUEST";
        public const string STOPPED_AUDIO_NOTIFICATION = "STOPPED_AUDIO_NOTIFICATION";
        public const string STOPPED_VIDEO_NOTIFICATION = "STOPPED_VIDEO_NOTIFICATION";

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

        public const string SEND_CHAT_MESSAGE_REQUEST = "SEND_CHAT_MESSAGE_REQUEST";
        public const string CHAT_MESSAGE_UPDATE = "CHAT_MESSAGE_UPDATE";

        public const string CHAT_MESSAGES_REQUEST = "CHAT_MESSAGES_REQUEST";
        public const string CHAT_MESSAGES_RESPONSE = "CHAT_MESSAGES_RESPONSE";


        public const string SEND_MOVIE_COMMENT_REQUEST = "SEND_MOVIE_COMMENT_REQUEST";
        public const string MOVIE_COMMENT_UPDATE = "MOVIE_COMMENT_UPDATE";

        public const string MOVIE_COMMENTS_REQUEST = "MOVIE_COMMENTS_REQUEST";
        public const string MOVIE_COMMENTS_RESPONSE = "MOVIE_COMMENTS_RESPONSE";

        public const string MOVIE_PAUSE_REQUEST = "MOVIE_PAUSE_REQUEST";
        public const string MOVIE_PAUSE_RESPONSE = "MOVIE_PAUSE_RESPONSE";

        public const string MOVIE_CLOSE_REQUEST = "MOVIE_CLOSE_REQUEST";
        public const string MOVIE_CLOSE_RESPONSE = "MOVIE_CLOSE_RESPONSE";

        public const string CONNECT_AUDIO_REQUEST = "CONNECT_AUDIO_REQUEST";
        public const string DISCONNECT_AUDIO_REQUEST = "DISCONNECT_AUDIO_REQUEST";
        public const string CONNECT_VIDEO_REQUEST = "CONNECT_VIDEO_REQUEST";
        public const string DISCONNECT_VIDEO_REQUEST = "DISCONNECT_VIDEO_REQUEST";

        public const string VIDEO_INFO_UPDATE = "VIDEO_INFO_UPDATE";
        public const string SOCKET_STATUS = "SOCKET_STATUS";

        public const string LEAVE_ROOM = "LEAVE_ROOM";
        public const string UPDATE_ROOM_CURRENT_TIME = "UPDATE_ROOM_CURRENT_TIME";

        // hmm............... idk if personal is needed or doable in the current implementation
        public const string MOVIE_CLOSE_PERSONAL_REQUEST = "MOVIE_CLOSE_PERSONAL_REQUEST";
        public const string MOVIE_CLOSE_PERSONAL_RESPONSE = "MOVIE_CLOSE_PERSONAL_RESPONSE";


        // --------------Socket peering connections
        public const string SOCKET_EVENT_PEER_MESSAGE = "SOCKET_EVENT_PEER_MESSAGE";
        public const string SOCKET_EVENT_PEER_CONNECTED = "SOCKET_EVENT_PEER_CONNECTED";
        public const string SOCKET_EVENT_PEER_DISCONNECTED = "SOCKET_EVENT_PEER_DISCONNECTED";
        public const string SOCKET_EVENT_CONNECT_TO_ROOM = "SOCKET_EVENT_CONNECT_TO_ROOM";
    }
}
