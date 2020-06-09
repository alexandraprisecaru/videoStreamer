using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StreamProviderWS.Models.Common;

namespace StreamProviderWS.Services
{
    public class RoomsProvider : IRoomsProvider
    {
        private static List<Movie> _movies = new List<Movie>();
        private static List<User> _users = new List<User>();

        private readonly List<MovieRoom> _rooms;

        public RoomsProvider(IProvider<Movie> moviesProvider, IProvider<User> usersProvider)
        {
            _movies = moviesProvider.GetAll().Result;
            _users = usersProvider.GetAll().Result;

            _rooms = new List<MovieRoom>();
        }

        public Task<List<MovieRoom>> GetAll()
        {
            return Task.Run(() => _rooms);
        }

        public Task<MovieRoom> GetById(string id)
        {
            return Task.Run(() => _rooms.FirstOrDefault(x => x.Id.Equals(id)));
        }

        public Task Add(MovieRoom item)
        {
            return Task.Run(() => _rooms.Add(item));
        }

        public Task<bool> Update(MovieRoom updatedItem)
        {
            var room = _rooms.FirstOrDefault(x => x.Id.Equals(updatedItem.Id));
            if (room == null)
            {
                return Task.Run(() => false);
            }

            room = updatedItem;
            return Task.Run(() => true);
        }

        public Task<bool> Delete(string id)
        {
            throw new NotImplementedException();
        }

        public Task<List<MovieRoom>> GetAllByUserId(string userId)
        {
            return Task.Run(() => _rooms.Where(x => x.Users.Any(u => u.id.Equals(userId))).ToList());
        }

        public Task<MovieRoom> CreateRoom(string movieId, string userId)
        {
            // todo: get movie by id
            var movie = _movies.FirstOrDefault(m => m.Id.Equals(movieId));

            // todo: get user by id (?)
            var user = _users.FirstOrDefault(u => u.id.Equals(userId));

            MovieRoom room = new MovieRoom
            {
                Id = Guid.NewGuid().ToString(),
                Movie = movie,
                Users = new List<User> { user },
                Stream = "",
                TimeWatched = 0
            };

            _rooms.Add(room);

            return Task.Run(() => room);
        }
    }
}
