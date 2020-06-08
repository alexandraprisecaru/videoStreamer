using System.Collections.Generic;
using System.Threading.Tasks;
using StreamProviderWS.Models.Common;

namespace StreamProviderWS.Services
{
    public interface IRoomsProvider : IProvider<MovieRoom>
    {
        Task<List<MovieRoom>> GetAllByUserId(string userId);

        Task<MovieRoom> CreateRoom(string movieId, string userId);
    }
}
