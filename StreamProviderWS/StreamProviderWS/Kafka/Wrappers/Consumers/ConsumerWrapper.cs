using System.Collections.Generic;

using Confluent.Kafka;


namespace StreamProviderWS.Kafka.Wrappers
{
    /// <summary>
    /// 
    /// </summary>
    public class ConsumerStringWrapper : BaseConsumerWrapper<string, string>
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="consumer"></param>
        /// <param name="topics"></param>
        public ConsumerStringWrapper(IConsumer<string, string> consumer, List<string> topics) : base(consumer, topics)
        {
        }
    }
}
