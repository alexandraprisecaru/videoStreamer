using StreamProviderWS.Models.Common;
using StreamProviderWS.Repositories.Interfaces;

namespace StreamProviderWS.Services
{
    public class UsersProvider : BaseProvider<User>
    {
        public UsersProvider(IRepository<User> repository) : base(repository)
        {
        }
    }
}
