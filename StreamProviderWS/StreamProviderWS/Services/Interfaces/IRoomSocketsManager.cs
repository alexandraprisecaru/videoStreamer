using System.Collections.Generic;
using StreamProviderWS.Models.Common;
using StreamProviderWS.Models.WebSocket;

namespace StreamProviderWS.Services
{
    public interface IRoomSocketsManager
    {
        void Add(RoomSockets roomSockets);

        void AddUserSocket(string roomId, UserSocket userSocket);

        void DeleteByRoomId(string roomId);
        void DeleteBySocketId(string socketId);
        void DeleteByUserId(string userId);

        List<RoomSockets> GetAll();

        List<RoomSockets> GetByRoomId(string roomId);
        List<RoomSockets> GetBySocketId(string socketId);
        List<RoomSockets> GetByUserId(string userId);
    }

}
