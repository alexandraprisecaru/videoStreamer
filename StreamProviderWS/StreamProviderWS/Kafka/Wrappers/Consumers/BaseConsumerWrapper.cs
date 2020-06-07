using System.Collections.Generic;
using System.Threading;

using Confluent.Kafka;


namespace StreamProviderWS.Kafka.Wrappers
{
   /// <summary>
   /// 
   /// </summary>
   public class BaseConsumerWrapper<T, U>
   {
      private readonly IConsumer<T, U> _consumer;

      /// <summary>
      /// 
      /// </summary>
      /// <param name="consumer"></param>
      /// <param name="topics"></param>
      public BaseConsumerWrapper(IConsumer<T, U> consumer, List<string> topics)
      {
         _consumer = consumer;
         _consumer.Subscribe(topics);
      }

      /// <summary>
      /// 
      /// </summary>
      /// <returns></returns>

      public ConsumeResult<T, U> ReadMessage(CancellationToken cancellationToken)
      {
         ConsumeResult<T, U> consumeResult = _consumer.Consume(cancellationToken);
         return consumeResult;
      }
   }
}
