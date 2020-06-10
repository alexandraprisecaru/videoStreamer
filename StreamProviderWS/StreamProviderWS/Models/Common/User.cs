using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace StreamProviderWS.Models.Common
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string IdDb { get; set; }

        public string id { get; set; }

        public string email { get; set; }

        public string name { get; set; }

        public string firstName { get; set; }

        public string lastName { get; set; }

        public string photoUrl { get; set; }
    }
}
