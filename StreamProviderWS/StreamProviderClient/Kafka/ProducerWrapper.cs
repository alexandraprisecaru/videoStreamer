using System;
using System.Threading.Tasks;
using Confluent.Kafka;

namespace StreamProviderWS.Kafka
{
    public class ProducerWrapper
    {
        private readonly string _topicName;
        private readonly IProducer<string, string> _producer;
        private static readonly Random rand = new Random();

        public ProducerWrapper(IProducer<string, string> producer, string topicName)
        {
            _topicName = topicName;
            _producer = producer;
        }

        public async Task WriteMessage(string message)
        {
            DeliveryResult<string, string> deliveryReport = await _producer.ProduceAsync(_topicName, new Message<string, string>()
            {
                Key = rand.Next(5).ToString(),
                Value = message
            });

            Console.WriteLine($"KAFKA => Delivered '{deliveryReport.Value}' to '{deliveryReport.TopicPartitionOffset}'");
        }
    }
}
