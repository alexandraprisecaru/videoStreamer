using System;

namespace StreamProviderWS.Models.Common
{
    public class ChatMessage : Base
    {
        public string RoomId { get; set; }

        public User User { get; set; }

        public string Message { get; set; }

        public string VoiceMessage { get; set; }

        public DateTime DateTime { get; set; }

        public double MovieCurrentTime { get; set; } // seconds into the movie
    }
}

