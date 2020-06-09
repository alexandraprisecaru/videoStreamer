using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace StreamProviderWS.Models.Common
{
    public class Base
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
    }
}
