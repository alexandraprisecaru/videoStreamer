using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Confluent.Kafka;
using Microsoft.Extensions.Hosting;

namespace StreamProviderWS.Kafka.Services
{
    /// <summary>
    /// 
    /// </summary>
    public class IdkYetService : BackgroundService
    {
        private readonly IConsumer<string, byte[]> _bytesConsumer;

        private const string GEOMETRY_RESPONSE = "trimbimresponse";

        /// <summary>
        /// 
        /// </summary>
        /// <param name="bytesConsumer"></param>
        public IdkYetService(IConsumer<string, byte[]> bytesConsumer)
        {
            _bytesConsumer = bytesConsumer;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="stoppingToken"></param>
        /// <returns></returns>
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await Run_Consume(new List<string> {GEOMETRY_RESPONSE}, stoppingToken);
        }

        public void WriteStreamToFile(Message<string, byte[]> message)
        {
            if (message?.Value == null)
            {
                return;
            }

            string time = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss.fffff", CultureInfo.InvariantCulture);
            File.AppendAllText(@"D:\results.txt",
                $"After producing:  {time} {Environment.NewLine} {Environment.NewLine}");

            MemoryStream stream = new MemoryStream();
            stream.Write(message.Value, 0, message.Value.Length);

            using (var fileStream = File.Create(@"D:\_Trimble\GeometryService\webgl-viewer\demo\pipe.trb7"))
            {
                stream.Seek(0, SeekOrigin.Begin);
                stream.CopyTo(fileStream);
            }
        }

        /// <summary>
        ///     In this example
        ///         - offsets are manually committed.
        ///         - no extra thread is created for the Poll (Consume) loop.
        /// </summary>
        public async Task Run_Consume(List<string> topics, CancellationToken cancellationToken)
        {
            const int commitPeriod = 5;

            ConsumerWrapper consumerWrapper = new ConsumerWrapper(_bytesConsumer, topics);
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

                        Console.WriteLine(
                            $"Received message at {consumeResult.TopicPartitionOffset}: {consumeResult.Value}");

                        if (consumeResult.Message?.Value != null)
                        {
                            WriteStreamToFile(consumeResult.Message);
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
