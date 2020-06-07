using Confluent.Kafka;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using StreamProviderWS.Kafka.Services;
using StreamProviderWS.Extensions;

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
            services.AddHostedService<GeometryBytesConsumerService>();
            services.AddHostedService<GeometryStringProducerService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
