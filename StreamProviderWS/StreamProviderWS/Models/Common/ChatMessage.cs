using System;

namespace StreamProviderWS.Models.Common
{
    public class ChatMessage
    {
        public string Id { get; set; }
       
        public string RoomId { get; set; }
        
        public string UserId { get; set; }
        
        public string Message { get; set; }
        
        public string VoiceMessage { get; set; }
        
        public DateTime DateTime { get; set; }
        
        public double MovieCurrentTime { get; set; } // seconds into the movie
    }
}

