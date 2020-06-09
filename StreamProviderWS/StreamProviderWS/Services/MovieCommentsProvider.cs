using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StreamProviderWS.Models.Common;

namespace StreamProviderWS.Services
{
    public class MovieCommentsProvider : IMovieCommentsProvider
    {
        private readonly List<MovieComment> _comments = new List<MovieComment>();

        public Task<List<MovieComment>> GetAll()
        {
            return Task.Run(() => _comments);
        }

        public Task<MovieComment> GetById(string id)
        {
            throw new NotImplementedException();
        }

        public Task Add(MovieComment item)
        {
            if (item == null)
            {
                return Task.CompletedTask;
            }
            _comments.Add(item);
            return Task.CompletedTask;
        }

        public Task<bool> Update(MovieComment updatedItem)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Delete(string id)
        {
            throw new NotImplementedException();
        }

        public Task<List<MovieComment>> GetByMovieId(string movieId)
        {
            return Task.Run(() => _comments.Where(c=>c.MovieId.Equals(movieId)).ToList());
        }
    }
}
