using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StreamProviderWS.Models.Common;
using StreamProviderWS.Repositories.Interfaces;

namespace StreamProviderWS.Services
{
    public class MovieCommentsProvider : BaseProvider<MovieComment>, IMovieCommentsProvider
    {
        private readonly IRepository<MovieComment> _repository;

        public MovieCommentsProvider(IRepository<MovieComment> repository) : base(repository)
        {
            _repository = repository;
        }

        public async Task<List<MovieComment>> GetByMovieId(string movieId)
        {
            var comments = await _repository.GetAllAsync();

            return comments.Where(c => c.MovieId.Equals(movieId)).ToList();
        }
    }
}
