using System;
using System.Threading.Tasks;

using Confluent.Kafka;


namespace StreamProviderWS.Kafka.Wrappers
{
   /// <summary>
   /// 
   /// </summary>
   public class ProducerBytesWrapper: BaseProducerWrapper<byte[]>
   {
      /// <summary>
      /// 
      /// </summary>
      /// <param name="bytesProducer"></param>
      /// <param name="topicName"></param>
      public ProducerBytesWrapper(IProducer<string, byte[]> bytesProducer, string topicName): base(bytesProducer, topicName)
      {
      }
   }
}
