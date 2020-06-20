namespace StreamProviderWS.Models.Common
{
    public class Movie : Base
    {
        public string Title { get; set; }

        public string Synopsis { get; set; }

        public string StreamUrl { get; set; }
        public string Image { get; set; }
    }
}
