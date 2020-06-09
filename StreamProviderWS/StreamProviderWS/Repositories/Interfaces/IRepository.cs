using System.Collections.Generic;
using System.Threading.Tasks;

namespace StreamProviderWS.Repositories.Interfaces
{
    public interface IRepository<T>
    {
        Task<List<T>> GetAllAsync();

        Task<T> GetByIdAsync(string id);
        
        Task<T> CreateAsync(T movie);

        Task UpdateAsync(string id, T item);

        Task RemoveAsync(T item);

        Task RemoveByIdAsync(string id);
    }
}
