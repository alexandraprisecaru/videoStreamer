using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StreamProviderWS.Models.Common;

namespace StreamProviderWS.Services
{
    public class UsersProvider : IUsersProvider
    {
        private readonly List<User> _users = new List<User>();

        public Task<List<User>> GetAll()
        {
            return Task.Run(() => _users);
        }

        public Task<User> GetById(string id)
        {
            return Task.Run(() => _users.FirstOrDefault(u => u.id.Equals(id)));
        }

        public Task Add(User item)
        {
            if (item == null)
            {
                return Task.CompletedTask;
            }

            if (_users.Any(u => u.id.Equals(item.id)))
            {
                return Task.CompletedTask;
            }

            return Task.Run(() => _users.Add(item));
        }

        public Task<bool> Update(User updatedItem)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Delete(string id)
        {
            throw new NotImplementedException();
        }
    }
}
