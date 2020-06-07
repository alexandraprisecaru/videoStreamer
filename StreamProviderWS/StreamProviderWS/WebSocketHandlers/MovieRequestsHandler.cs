using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using StreamProviderWS.Managers;
using StreamProviderWS.Models.Common;
using StreamProviderWS.Models.WebSocket;
using StreamProviderWS.Services;

namespace StreamProviderWS.WebSocketHandlers
{
    public class MovieRequestsHandler : WebSocketHandler
    {
        private readonly IProvider<Movie> _movieProvider;

        public MovieRequestsHandler(ConnectionManager webSocketConnectionManager, IProvider<Movie> movieProvider)
            : base(webSocketConnectionManager)
        {
            _movieProvider = movieProvider;
        }

        public override async Task OnConnected(WebSocket socket)
        {
            await base.OnConnected(socket);

            var socketId = WebSocketConnectionManager.GetId(socket);

            //await SendMessageAsync(socket, "{}");
            //await SendMessageToAllAsync($"{socketId} is now connected");
        }

        public override async Task ReceiveAsync(WebSocket socket, WebSocketReceiveResult result, byte[] buffer)
        {
            var socketId = WebSocketConnectionManager.GetId(socket);

            var a = Encoding.UTF8.GetString(buffer, 0, result.Count);

            //todo: maybe add a switch based on Message Type and handle all cases
             
            if (a.Equals(MessageType.MovieListRequest))
            {
                var movies = await _movieProvider.GetAll();
                var json = JsonConvert.SerializeObject(movies);

                await SendMessageAsync(socket, json);
            }

            var message = $"{socketId} said: {Encoding.UTF8.GetString(buffer, 0, result.Count)}";

            //await SendMessageToAllAsync(message);
        }
    }
}
