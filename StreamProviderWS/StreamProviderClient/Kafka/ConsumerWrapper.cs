using System.Collections.Generic;
using System.Threading;
using Confluent.Kafka;

namespace StreamProviderWS.Kafka
{
    public class ConsumerWrapper
    {
        private readonly IConsumer<string, byte[]> _bytesConsumer;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="bytesConsumer"></param>
        /// <param name="topics"></param>
        public ConsumerWrapper(IConsumer<string, byte[]> bytesConsumer, List<string> topics)
        {
            _bytesConsumer = bytesConsumer;
            _bytesConsumer.Subscribe(topics);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public ConsumeResult<string, byte[]> ReadMessage(CancellationToken cancellationToken)
        {
            ConsumeResult<string, byte[]> consumeResult = _bytesConsumer.Consume(cancellationToken);
            return consumeResult;
        }
    }
}
