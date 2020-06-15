using System.Collections.Generic;
using System.Linq;
using StreamProviderWS.Models.WebSocket;

namespace StreamProviderWS.Services
{
    public class RoomSocketsManager : IRoomSocketsManager
    {
        protected List<RoomSockets> RoomSockets { get; set; }

        public RoomSocketsManager()
        {
            RoomSockets = new List<RoomSockets>();
        }

        public void Add(RoomSockets roomSockets)
        {
            if (roomSockets == null)
            {
                return;
            }

            RoomSockets.Add(roomSockets);
        }

        public void AddUserSocket(string roomId, UserSocket userSocket)
        {
            if (string.IsNullOrWhiteSpace(roomId))
            {
                return;
            }

            if (userSocket == null)
            {
                return;
            }

            var existent = RoomSockets.FirstOrDefault(x => x.RoomId.Equals(roomId));
            if (existent == null)
            {
                RoomSockets.Add(new RoomSockets
                {
                    RoomId = roomId,
                    UserSockets = new List<UserSocket> { userSocket }
                });
            }
            else
            {
                existent.UserSockets.Add(userSocket);
            }
        }

        public void DeleteByRoomId(string roomId)
        {
            if (string.IsNullOrWhiteSpace(roomId))
            {
                return;
            }

            RoomSockets.RemoveAll(x => x.RoomId.Equals(roomId));
        }

        public void DeleteBySocketId(string socketId)
        {
            if (string.IsNullOrWhiteSpace(socketId))
            {
                return;
            }

            GetBySocketId(socketId).ForEach(a =>
            {
                a.UserSockets.RemoveAll(x => x.SocketId.Equals(socketId));
            });
        }

        public void DeleteByUserId(string userId)
        {
            if (string.IsNullOrWhiteSpace(userId))
            {
                return;
            }

            GetByUserId(userId).ForEach(a =>
            {
                a.UserSockets.RemoveAll(x => x.SocketId.Equals(userId));
            });
        }

        public List<RoomSockets> GetAll()
        {
            return RoomSockets;
        }

        public List<RoomSockets> GetByRoomId(string roomId)
        {
            if (string.IsNullOrWhiteSpace(roomId))
            {
                return null;
            }

            return RoomSockets.Where(x => x.RoomId.Equals(roomId)).ToList();
        }

        public List<RoomSockets> GetBySocketId(string socketId)
        {
            if (string.IsNullOrWhiteSpace(socketId))
            {
                return null;
            }

            return RoomSockets.Where(x => x.UserSockets.Any(u => u.SocketId.Equals(socketId))).ToList();
        }

        public List<RoomSockets> GetByUserId(string userId)
        {
            if (string.IsNullOrWhiteSpace(userId))
            {
                return null;
            }

            return RoomSockets.Where(x => x.UserSockets.Any(u => u.UserId.Equals(userId))).ToList();
        }
    }
}
