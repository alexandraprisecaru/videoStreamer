using System.Collections.Generic;
using System.Threading.Tasks;

namespace StreamProviderWS.Services
{
    public interface IProvider<T> where T : class
    {
        Task<List<T>> GetAll();

        Task<T> GetById(string id);

        Task Add(T item);

        Task<bool> Update(T updatedItem);

        Task<bool> Delete(string id);
    }
}
