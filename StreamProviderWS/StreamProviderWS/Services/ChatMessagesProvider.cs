using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StreamProviderWS.Models.Common;
using StreamProviderWS.Repositories.Interfaces;

namespace StreamProviderWS.Services
{
    public class ChatMessagesProvider : BaseProvider<ChatMessage>, IChatMessagesProvider
    {
        private readonly IRepository<ChatMessage> _chatMessageRepository;

        public ChatMessagesProvider(IRepository<ChatMessage> chatMessageRepository) : base(chatMessageRepository)
        {
            _chatMessageRepository = chatMessageRepository;
        }


        public async Task<List<ChatMessage>> GetAllByRoomId(string roomId)
        {
            var messages = await _chatMessageRepository.GetAllAsync();
            if (messages == null)
            {
                return new List<ChatMessage>();
            }

            return messages.Where(m => m.RoomId.Equals(roomId)).ToList();
        }
    }
}
