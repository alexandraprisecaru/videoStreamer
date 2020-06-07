using System.Collections.Generic;
using System.Threading;
using Confluent.Kafka;

namespace StreamProviderWS.Kafka.Wrappers
{
    /// <summary>
    /// 
    /// </summary>
    public class ConsumerBytesWrapper : BaseConsumerWrapper<string, byte[]>
    {
        public ConsumerBytesWrapper(IConsumer<string, byte[]> consumer, List<string> topics) : base(consumer, topics)
        {
        }
    }
}
