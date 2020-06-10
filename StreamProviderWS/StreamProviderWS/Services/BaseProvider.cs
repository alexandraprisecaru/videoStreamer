using System.Collections.Generic;
using System.Threading.Tasks;
using StreamProviderWS.Repositories.Interfaces;

namespace StreamProviderWS.Services
{
    public class BaseProvider<T> : IProvider<T> where T : class
    {
        private readonly IRepository<T> _repository;

        public BaseProvider(IRepository<T> repository)
        {
            _repository = repository;
        }

        public async Task Add(T item)
        {
            if (item == null)
            {
                return;
            }

            await _repository.CreateAsync(item);
        }

        public async Task Delete(string id)
        {
            await _repository.RemoveByIdAsync(id);
        }

        public async Task<List<T>> GetAll()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<T> GetById(string id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task Update(string id, T updatedItem)
        {
            await _repository.UpdateAsync(id, updatedItem);
        }
    }
}
