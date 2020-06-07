using System.Runtime.CompilerServices;
using Confluent.Kafka;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace StreamProviderWS.Extensions
{
    public static class KafkaExtensions
    {
        public static IServiceCollection AddConsumer<T, U>(this IServiceCollection services, IConfigurationRoot configuration, string consumerConfiguration)
        {
            //ConsumerConfig consumerConfig = new ConsumerConfig();
            //configuration.Bind("consumer", consumerConfig);
            services.Configure<ConsumerConfig>(configuration.GetSection(consumerConfiguration));

            ConsumerConfig consumerConfig = services.BuildServiceProvider().GetService<IOptionsSnapshot<ConsumerConfig>>().Value;
            services.AddSingleton(consumerConfig);

            IConsumer<T, U> consumer = new ConsumerBuilder<T, U>(consumerConfig).Build();
            services.AddSingleton(consumer);
            
            return services;
        }

        public static IServiceCollection AddProducer<T, U>(this IServiceCollection services, IConfigurationRoot configuration, string producerConfiguration)
        {
            //ConsumerConfig consumerConfig = new ConsumerConfig();
            //configuration.Bind("consumer", consumerConfig);
            services.Configure<ProducerConfig>(configuration.GetSection(producerConfiguration));

            ProducerConfig producerConfig = services.BuildServiceProvider().GetService<IOptionsSnapshot<ProducerConfig>>().Value;
            services.AddSingleton(producerConfig);

            IProducer<T, U> producer = new ProducerBuilder<T, U>(producerConfig).Build();
            services.AddSingleton(producer);

            return services;
        }
    }
}
