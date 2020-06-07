using System;
using System.Threading.Tasks;

using Confluent.Kafka;


namespace StreamProviderWS.Kafka.Wrappers
{
   /// <summary>
   /// 
   /// </summary>
   public class BaseProducerWrapper<TOutput>
   {
      private readonly string _topicName;
      private readonly IProducer<string, TOutput> _producer;
      private static readonly Random rand = new Random();

      public BaseProducerWrapper(IProducer<string, TOutput> producer, string topicName)
      {
         _topicName = topicName;
         _producer = producer;
         // _producer.OnError += (_, errorEvent) =>
         // {
         //    Console.WriteLine("Exception:" + errorEvent);
         // };
      }

      public async Task WriteMessage(TOutput message)
      {
         DeliveryResult<string, TOutput> deliveryReport = await _producer.ProduceAsync(_topicName, new Message<string, TOutput>()
         {
            Key = rand.Next(5).ToString(),
            Value = message
         });

         Console.WriteLine($"KAFKA => Delivered '{deliveryReport.Value}' to '{deliveryReport.TopicPartitionOffset}'");
      }
   }
}
