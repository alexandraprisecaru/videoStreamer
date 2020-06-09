using System;

namespace StreamProviderWS.Models.Common
{
    public class MovieComment : Base
    {
        public string MovieId { get; set; }

        public User User { get; set; }

        public string Comment { get; set; }

        public double CurrentTime { get; set; } // seconds into the movie
    }
}

