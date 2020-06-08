using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StreamProviderWS.Models.Common;

namespace StreamProviderWS.Services
{
    public class RoomsProvider : IRoomsProvider
    {
        private static List<Movie> _movies;
        private static List<User> _users;

        public RoomsProvider(IProvider<Movie> moviesProvider, IProvider<User> usersProvider)
        {
            _movies = moviesProvider.GetAll().Result;
            _users = usersProvider.GetAll().Result;
        }

        private readonly List<MovieRoom> _rooms = new List<MovieRoom>
        {
            new MovieRoom
            {
                Id = Guid.NewGuid().ToString(),
                Movie = _movies.FirstOrDefault(),
                Users = _users,
            },
            new MovieRoom
            {
                Id = Guid.NewGuid().ToString(),
                Movie = _movies.FirstOrDefault(),
                Users = _users,
            }
        };

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
            throw new NotImplementedException();
        }

        public Task<bool> Delete(string id)
        {
            throw new NotImplementedException();
        }

        public Task<List<MovieRoom>> GetAllByUserId(string userId)
        {
            return Task.Run(() => _rooms.Where(x => x.Users.Any(u => u.Id.Equals(userId))).ToList());
        }
    }
}
