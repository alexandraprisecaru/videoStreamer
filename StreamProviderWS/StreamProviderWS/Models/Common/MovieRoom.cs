using System.Collections.Generic;

namespace StreamProviderWS.Models.Common
{
    public class MovieRoom
    {
        public string Id { get; set; }
        
        public Movie Movie { get; set; }
        
        public List<User> Users { get; set; }
        
        public string Stream { get; set; }
        
        public double TimeWatched { get; set; }
    }
}
