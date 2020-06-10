using System.Collections.Generic;
using System.Threading.Tasks;

namespace StreamProviderWS.Services
{
    public interface IProvider<T> where T : class
    {
        Task<List<T>> GetAll();

        Task<T> GetById(string id);

        Task Add(T item);

        Task Update(string id, T updatedItem);

        Task Delete(string id);
    }
}
