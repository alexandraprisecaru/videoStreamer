using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

using Confluent.Kafka;

using Microsoft.Extensions.Hosting;
using StreamProviderWS.Kafka.Wrappers;

#pragma warning disable 4014


namespace StreamProviderWS.Kafka.Services
{
   /// <summary>
   /// 
   /// </summary>
   public class GeometryStringProducerService : BackgroundService
   {

      private readonly IProducer<string, string> _producer;
      private readonly IConsumer<string, string> _consumer;

      private const string GEOMETRY_REQUEST = "geometryrequest";

      private const string GEOMETRY_STRING_REQUEST = "geometrystringrequest";
      private const string GEOMETRY_STRING_RESPONSE = "geometrystringresponse";

      private const string TRIMBIM_REQUEST = "trimbimrequest";
      private const string TRIMBIM_RESPONSE = "trimbimresponse";

      /// <summary>
      /// 
      /// </summary>
      /// <param name="producer"></param>
      /// <param name="consumer"></param>
      public GeometryStringProducerService(IProducer<string, string> producer, IConsumer<string, string> consumer)
      {
         _producer = producer;
         _consumer = consumer;
      }

      /// <summary>
      /// 
      /// </summary>
      /// <param name="stoppingToken"></param>
      /// <returns></returns>
      /// <exception cref="NotImplementedException"></exception>
      protected override async Task ExecuteAsync(CancellationToken stoppingToken)
      {
         await Run_Consume(new List<string> { GEOMETRY_REQUEST, GEOMETRY_STRING_RESPONSE, TRIMBIM_RESPONSE }, stoppingToken);
      }

      /// <summary>
      /// 
      /// </summary>
      /// <param name="message"></param>
      /// <returns></returns>
      public void ProcessCatalogArticleExtended(Message<string, string> message)// CatalogArticleExtended serialized
      {
         ProducerStringWrapper producerWrapper = new ProducerStringWrapper(_producer, GEOMETRY_STRING_REQUEST);
         producerWrapper.WriteMessage(message.Value);
      }

      /// <summary>
      /// 
      /// </summary>
      /// <param name="message"></param>
      /// <returns></returns>
      public void ProcessGeometryString(Message<string, string> message) // geometry string
      {
         ProducerStringWrapper producerWrapper = new ProducerStringWrapper(_producer, TRIMBIM_REQUEST);
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
         IConsumer<string, string> consumer;
         ConsumerStringWrapper consumerWrapper = new ConsumerStringWrapper(_consumer, topics);
         try
         {
            while (true)
            {
               try
               {
                  ConsumeResult<string, string> consumeResult = consumerWrapper.ReadMessage(cancellationToken);

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
                        case GEOMETRY_REQUEST:
                           ProcessCatalogArticleExtended(consumeResult.Message);
                           break;
                        case GEOMETRY_STRING_RESPONSE:
                           ProcessGeometryString(consumeResult.Message);
                           break;
                     }
                  }

                  if (consumeResult.Offset % commitPeriod == 0)
                  {
                     try
                     {
                        _consumer.Commit(consumeResult);
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
            _consumer.Close();
         }
      }
   }
}
