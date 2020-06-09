using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StreamProviderWS.Models.Common;

namespace StreamProviderWS.Services
{
    public class ChatMessagesProvider : IChatMessagesProvider
    {
        private readonly List<ChatMessage> _chatMessages = new List<ChatMessage>
        {
        };

        public Task<List<ChatMessage>> GetAll()
        {
            return Task.Run(() => _chatMessages);
        }

        public Task<ChatMessage> GetById(string id)
        {
            throw new NotImplementedException();
        }

        public Task Add(ChatMessage item)
        {
            if (item == null)
            {
                return Task.CompletedTask;
            }
            _chatMessages.Add(item);
            return Task.CompletedTask;
        }

        public Task<bool> Update(ChatMessage updatedItem)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Delete(string id)
        {
            throw new NotImplementedException();
        }

        public Task<List<ChatMessage>> GetAllByRoomId(string roomId)
        {
            return Task.Run(() => _chatMessages.Where(m => m.RoomId.Equals(roomId)).ToList());
        }
    }
}
