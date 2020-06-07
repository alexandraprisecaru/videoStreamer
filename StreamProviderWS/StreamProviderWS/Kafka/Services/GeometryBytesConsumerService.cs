using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

using Confluent.Kafka;

using Microsoft.Extensions.Hosting;
using StreamProviderWS.Kafka.Wrappers;


namespace StreamProviderWS.Kafka.Services
{
    /// <summary>
    /// 
    /// </summary>
    public class GeometryBytesConsumerService : BackgroundService
    {
        private readonly IProducer<string, byte[]> _bytesProducer;
        private readonly IConsumer<string, byte[]> _bytesConsumer;

        private const string GEOMETRY_RESPONSE = "geometryresponse";
        private const string TRIMBIM_RESPONSE = "trimbimresponse";

        /// <summary>
        /// 
        /// </summary>
        /// <param name="bytesProducer"></param>
        /// <param name="bytesConsumer"></param>
        public GeometryBytesConsumerService(
           IProducer<string, byte[]> bytesProducer,
           IConsumer<string, byte[]> bytesConsumer)
        {
            _bytesProducer = bytesProducer;
            _bytesConsumer = bytesConsumer;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="stoppingToken"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await Run_Consume(new List<string> { TRIMBIM_RESPONSE }, stoppingToken);
        }

        private void ProcessTrimBIM(Message<string, byte[]> message)// Trimbim byte serialized
        {
            ProducerBytesWrapper producerWrapper = new ProducerBytesWrapper(_bytesProducer, GEOMETRY_RESPONSE);
            producerWrapper.WriteMessage(message.Value);
        }

        /// <summary>
        ///     In this example
        ///         - offsets are manually committed.
        ///         - no extra thread is created for the Poll (Consume) loop.
        /// </summary>
        public async Task Run_Consume(List<string> topics, CancellationToken cancellationToken)
        {
            const int commitPeriod = 5;

            ConsumerBytesWrapper consumerWrapper = new ConsumerBytesWrapper(_bytesConsumer, topics);
            try
            {
                while (true)
                {
                    try
                    {
                        ConsumeResult<string, byte[]> consumeResult = consumerWrapper.ReadMessage(cancellationToken);

                        if (consumeResult.IsPartitionEOF)
                        {
                            Console.WriteLine(
                                $"Reached end of topic {consumeResult.Topic}, partition {consumeResult.Partition}, offset {consumeResult.Offset}.");

                            continue;
                        }

                        Console.WriteLine($"Received message at {consumeResult.TopicPartitionOffset}: {consumeResult.Value}");

                        if (consumeResult?.Message?.Value != null)
                        {
                            switch (consumeResult.Topic)
                            {
                                case TRIMBIM_RESPONSE:
                                    ProcessTrimBIM(consumeResult.Message);
                                    break;
                            }
                        }

                        if (consumeResult.Offset % commitPeriod == 0)
                        {
                            try
                            {
                                _bytesConsumer.Commit(consumeResult);
                            }
                            catch (KafkaException e)
                            {
                                Console.WriteLine($"Commit error: {e.Error.Reason}");
                            }
                        }
                    }
                    catch (ConsumeException e)
                    {
                        Console.WriteLine($"Consume error: {e.Error.Reason}");
                    }
                }
            }
            catch (OperationCanceledException)
            {
                Console.WriteLine("Closing consumer.");
                _bytesConsumer.Close();
            }
        }
    }
}
