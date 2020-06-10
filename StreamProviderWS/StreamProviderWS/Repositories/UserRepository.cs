using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using StreamProviderWS.Models.Common;
using StreamProviderWS.Repositories.Interfaces;
using StreamProviderWS.Repositories.Models;

namespace StreamProviderWS.Repositories
{
    public class UserRepository : IRepository<User>
    {
        private readonly IMongoCollection<User> _collection;

        public UserRepository(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _collection = database.GetCollection<User>(typeof(User).Name);
        }

        public async Task<List<User>> GetAllAsync() => (await _collection.FindAsync(user => true)).ToList();

        public async Task<User> GetByIdAsync(string id)
        {
            return (await _collection.FindAsync(user => user.id == id)).FirstOrDefault();
        }

        public async Task<User> CreateAsync(User user)
        {
            var existent = (await GetAllAsync()).FirstOrDefault(u => u.id.Equals(user.id));
            if (existent != null)
            {
                return existent;
            }

            await _collection.InsertOneAsync(user);
            return user;
        }

        public async Task UpdateAsync(string id, User userIn) =>
            await _collection.ReplaceOneAsync(user => user.IdDb == id, userIn);

        public async Task RemoveAsync(User userIn) =>
            await _collection.DeleteOneAsync(user => user.IdDb == userIn.id);

        public async Task RemoveByIdAsync(string id)
        {
            await _collection.DeleteOneAsync(user => user.IdDb == id);
        }
    }
}
