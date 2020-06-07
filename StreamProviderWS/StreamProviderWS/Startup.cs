using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using StreamProviderWS.Extensions;
using StreamProviderWS.Models.Common;
using StreamProviderWS.Services;
using StreamProviderWS.WebSocketHandlers;

namespace StreamProviderWS
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = (IConfigurationRoot)configuration;
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton(Configuration);
            services.AddControllers();
            //ProducerConfig producerConfig = new ProducerConfig();
            //ConsumerConfig consumerConfig = new ConsumerConfig();

            //Configuration.Bind("producer", producerConfig);
            //Configuration.Bind("consumer", consumerConfig);

            //services.AddSingleton(producerConfig);
            //services.AddSingleton(consumerConfig);

            //IProducer<string, string> producer = new ProducerBuilder<string, string>(producerConfig).Build();
            //IProducer<string, byte[]> bytesProducer = new ProducerBuilder<string, byte[]>(producerConfig).Build();

            //IConsumer<string, string> consumer = new ConsumerBuilder<string, string>(consumerConfig).Build();
            //IConsumer<string, byte[]> bytesConsumer = new ConsumerBuilder<string, byte[]>(consumerConfig).Build();

            //services.AddSingleton(producer);
            //services.AddSingleton(bytesProducer);
            //services.AddSingleton(consumer);
            //services.AddSingleton(bytesConsumer);

            services.AddConsumer<string, string>(Configuration, "consumer");
            services.AddConsumer<string, byte[]>(Configuration, "consumer");
            services.AddProducer<string, string>(Configuration, "producer");
            services.AddProducer<string, byte[]>(Configuration, "producer");
            //services.AddHostedService<GeometryBytesConsumerService>();
            //services.AddHostedService<GeometryStringProducerService>();

            services.TryAddSingleton<IProvider<Movie>, MoviesProvider>();
            services.AddWebSocketManager();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            var serviceScopeFactory = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>();
            var serviceProvider = serviceScopeFactory.CreateScope().ServiceProvider;

            app.UseWebSockets();

            app.MapWebSocketManager("/chat", serviceProvider.GetService<ChatMessageHandler>());
            app.MapWebSocketManager("/movies", serviceProvider.GetService<MovieRequestsHandler>());

            app.UseStaticFiles();
            
            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

    }
}