using System.Collections.Generic;
using System.Threading.Tasks;
using StreamProviderWS.Models.Common;
using StreamProviderWS.Repositories.Interfaces;

namespace StreamProviderWS.Services
{
    public class MoviesProvider : IMoviesProvider
    {
        private readonly IRepository<Movie> _movieRepository;

        public MoviesProvider(IRepository<Movie> movieRepository)
        {
            _movieRepository = movieRepository;
        }

        private readonly List<Movie> _movies = new List<Movie>
        {
            new Movie
            {
                Title = "Zodiac",
                Synopsis = "Serial killer movie"
            },
            new Movie
            {
                Title = "The Good Will Hunting",
                Synopsis = "Best and sweetest movie ever :D"
            }
        };

        public async Task<List<Movie>> GetAll()
        {
            return await _movieRepository.GetAllAsync();
        }

        public async Task<Movie> GetById(string id)
        {
            return await _movieRepository.GetByIdAsync(id);
        }

        public async Task Add(Movie item)
        {
            await _movieRepository.CreateAsync(item);
        }

        public async Task<bool> Update(Movie updatedItem)
        {
            await _movieRepository.UpdateAsync(updatedItem.Id, updatedItem);
            return true;
        }

        public async Task<bool> Delete(string id)
        {
            await _movieRepository.RemoveByIdAsync(id);
            return true;
        }
    }
}
