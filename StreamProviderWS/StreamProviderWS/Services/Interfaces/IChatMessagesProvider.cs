using System.Collections.Generic;
using System.Threading.Tasks;
using StreamProviderWS.Models.Common;

namespace StreamProviderWS.Services
{
    public interface IChatMessagesProvider : IProvider<ChatMessage>
    {
        Task<List<ChatMessage>> GetAllByRoomId(string roomId);
    }
}
