using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StreamProviderWS.Models.Common;
using StreamProviderWS.Repositories.Interfaces;

namespace StreamProviderWS.Services
{
    public class RoomsProvider : BaseProvider<MovieRoom>, IRoomsProvider
    {
        private readonly IRepository<MovieRoom> _roomRepository;
        private readonly IRepository<Movie> _movieRepository;
        private readonly IRepository<User> _userRepository;

        public RoomsProvider(
            IRepository<MovieRoom> roomRepository,
            IRepository<Movie> movieRepository,
            IRepository<User> userRepository)
            : base(roomRepository)
        {
            _roomRepository = roomRepository;
            _movieRepository = movieRepository;
            _userRepository = userRepository;
        }

        public async Task<List<MovieRoom>> GetAllByUserId(string userId)
        {
            var rooms = await _roomRepository.GetAllAsync();

            return rooms.Where(x => x.Users.Any(u => u.id.Equals(userId))).ToList();
        }

        public async Task<MovieRoom> CreateRoom(string movieId, string userId)
        {
            var movie = await _movieRepository.GetByIdAsync(movieId);

            if (movie == null)
            {
                return null;
            }

            var user = await _userRepository.GetByIdAsync(userId);

            MovieRoom room = new MovieRoom
            {
                Movie = movie,
                Users = new List<User> { user },
                Stream = "",
                TimeWatched = 0
            };

            return await _roomRepository.CreateAsync(room);
        }
    }
}
