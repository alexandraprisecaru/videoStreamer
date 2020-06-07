using System;

using Confluent.Kafka;


namespace StreamProviderWS.Kafka.Wrappers
{
    /// <summary>
    /// 
    /// </summary>
    public class ProducerStringWrapper : BaseProducerWrapper<string>
    {
        public ProducerStringWrapper(IProducer<string, string> producer, string topicName) : base(producer, topicName)
        {
        }
    }
}
