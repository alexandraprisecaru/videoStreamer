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

        public override async Task ReceiveAsync(WebSocket socket, WebSocketReceiveResult result, byte[] buffer)
        {
            var socketId = WebSocketConnectionManager.GetId(socket);

            var a = Encoding.UTF8.GetString(buffer, 0, result.Count);

            var messageWrapper = JsonConvert.DeserializeObject<MessageWrapper>(a);

            // todo: checkups

            //todo: maybe add a switch based on Message Type and handle all cases
            switch (messageWrapper.type)
            {
                case MessageType.MovieListRequest:
                    var movies = await _movieProvider.GetAll();
                    var jsonMovies = JsonConvert.SerializeObject(movies);
                    var messageResponseWrapper = new MessageWrapper
                    {
                        type = MessageType.MovieListResponse,
                        payload = jsonMovies
                    };

                    var json = JsonConvert.SerializeObject(messageResponseWrapper);

                    await SendMessageAsync(socket, json);
                    break;
                default:
                    break;
            }
        }
    }
}
