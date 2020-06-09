using System.Collections.Generic;
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

        public async Task<List<T>> GetAllAsync() => (await _collection.FindAsync(movie => true)).ToList();

        public async Task<T> GetByIdAsync(string id) =>
            (await _collection.FindAsync(movie => movie.Id == id)).FirstOrDefault();

        public async Task<T> CreateAsync(T movie)
        {
            await _collection.InsertOneAsync(movie);
            return movie;
        }

        public async Task UpdateAsync(string id, T movieIn) =>
            await _collection.ReplaceOneAsync(movie => movie.Id == id, movieIn);

        public async Task RemoveAsync(T movieIn) =>
            await _collection.DeleteOneAsync(movie => movie.Id == movieIn.Id);

        public async Task RemoveByIdAsync(string id)
        {
            await _collection.DeleteOneAsync(movie => movie.Id == id);
        }
    }
}
