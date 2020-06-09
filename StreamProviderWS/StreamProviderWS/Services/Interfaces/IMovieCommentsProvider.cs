using System.Collections.Generic;
using System.Threading.Tasks;
using StreamProviderWS.Models.Common;

namespace StreamProviderWS.Services
{
    public interface IMovieCommentsProvider : IProvider<MovieComment>
    {
        Task<List<MovieComment>> GetByMovieId(string movieId);
    }
}
