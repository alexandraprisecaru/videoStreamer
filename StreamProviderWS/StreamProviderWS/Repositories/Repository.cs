using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using StreamProviderWS.Models.Common;
using StreamProviderWS.Repositories.Interfaces;
using StreamProviderWS.Repositories.Models;

namespace StreamProviderWS.Repositories
{
    public class Repository<T> : IRepository<T> where T : Base
    {
        private readonly IMongoCollection<T> _collection;

        public Repository(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _collection = database.GetCollection<T>(typeof(T).Name);
        }

        public async Task<List<T>> GetAllAsync() => (await _collection.FindAsync(item => true)).ToList();

        public async Task<T> GetByIdAsync(string id) =>
            (await _collection.FindAsync(item => item.Id == id)).FirstOrDefault();

        public async Task<T> CreateAsync(T item)
        {
            var existent = await GetByIdAsync(item.Id);
            if (existent != null)
            {
                return existent;
            }

            await _collection.InsertOneAsync(item);

            return item;
        }

        public async Task UpdateAsync(string id, T itemIn) =>
            await _collection.ReplaceOneAsync(item => item.Id == id, itemIn);

        public async Task RemoveAsync(T itemIn) =>
            await _collection.DeleteOneAsync(item => item.Id == itemIn.Id);

        public async Task RemoveByIdAsync(string id)
        {
            await _collection.DeleteOneAsync(item => item.Id == id);
        }
    }
}
