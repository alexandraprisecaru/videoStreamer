using System.Collections.Generic;

namespace StreamProviderWS.Models.Common
{
    public class MovieRoom : Base
    {
        public Movie Movie { get; set; }

        public List<UserRoom> UsersInRoom { get; set; }

        public string Stream { get; set; }

        public double TimeWatched { get; set; }
    }
}
