using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StreamProviderWS.Models.Common;

namespace StreamProviderWS.Services
{
    public class MoviesProvider : IMoviesProvider
    {
        private readonly List<Movie> _movies = new List<Movie>
        {
            new Movie
            {
                Id = Guid.NewGuid().ToString(),
                Title = "Zodiac",
                Synopsis = "Serial killer movie"
            },
            new Movie
            {
                Id = Guid.NewGuid().ToString(),
                Title = "The Good Will Hunting",
                Synopsis = "Best and sweetest movie ever :D"
            }
        };

        public Task<List<Movie>> GetAll()
        {
            return Task.Run(() => _movies);
        }

        public Task<Movie> GetById(string id)
        {
            return Task.Run(() => _movies.FirstOrDefault(m => m.Id.Equals(id)));
        }

        public Task Add<T>(T item)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update<T>(T item)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Delete<T>(string id)
        {
            throw new NotImplementedException();
        }
    }
}
