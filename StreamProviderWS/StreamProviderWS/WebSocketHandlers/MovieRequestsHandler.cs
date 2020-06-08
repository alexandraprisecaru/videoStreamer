using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using StreamProviderWS.Managers;
using StreamProviderWS.Models.Common;
using StreamProviderWS.Models.WebSocket;
using StreamProviderWS.Models.WebSocket.RequestsMessages;
using StreamProviderWS.Services;

namespace StreamProviderWS.WebSocketHandlers
{
    public class MovieRequestsHandler : WebSocketHandler
    {
        private readonly IProvider<Movie> _movieProvider;
        private readonly IProvider<User> _userProvider;

        public MovieRequestsHandler(
            ConnectionManager webSocketConnectionManager,
            IProvider<Movie> movieProvider,
            IProvider<User> userProvider)
            : base(webSocketConnectionManager)
        {
            _movieProvider = movieProvider;
            _userProvider = userProvider;
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
                case MessageType.SAVE_USER_REQUEST:
                    var saveUserRequest = JsonConvert.DeserializeObject<SaveUserRequest>(messageWrapper.payload);
                    if (saveUserRequest?.User == null)
                    {
                        break;
                    }

                    await _userProvider.Add(saveUserRequest.User);
                    
                    // todo: get user information from socket, call users provider, save user info. There's no need to respond in this case

                    break;
                case MessageType.MOVIE_LIST_REQUEST:
                    var movies = await _movieProvider.GetAll();
                    var jsonMovies = JsonConvert.SerializeObject(movies);
                    var messageResponseWrapper = new MessageWrapper
                    {
                        type = MessageType.MOVIE_LIST_RESPONSE,
                        payload = jsonMovies
                    };

                    var json = JsonConvert.SerializeObject(messageResponseWrapper);

                    await SendMessageAsync(socket, json);
                    break;


                case MessageType.MOVIE_ROOMS_REQUEST:
                    //var movies = await _movieProvider.GetAll();
                    //var jsonMovies = JsonConvert.SerializeObject(movies);
                    //var messageResponseWrapper = new MessageWrapper
                    //{
                    //    type = MessageType.MOVIE_LIST_RESPONSE,
                    //    payload = jsonMovies
                    //};

                    //var json = JsonConvert.SerializeObject(messageResponseWrapper);

                    //await SendMessageAsync(socket, json);
                    break;
                default:
                    break;
            }
        }
    }
}
