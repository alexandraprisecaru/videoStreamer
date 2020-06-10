using System.Collections.Generic;
using System.Threading.Tasks;
using StreamProviderWS.Models.Common;
using StreamProviderWS.Repositories.Interfaces;

namespace StreamProviderWS.Services
{
    public class MoviesProvider : BaseProvider<Movie>
    {
        public MoviesProvider(IRepository<Movie> movieRepository) : base(movieRepository) { }
    }
}
