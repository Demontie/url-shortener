import type { IMessagePublisher } from '@/domain/ports/messaging/message-publisher.interface';
import type { IMessageSubscriber } from '@/domain/ports/messaging/message-subscriber.interface';
import type { RabbitMQClient } from './rabbitmq/rabbitmq-client';

export class MessageBroker implements IMessagePublisher, IMessageSubscriber {
  constructor(private readonly client: RabbitMQClient) {}

  async publish<T = any>(topic: string, message: T): Promise<void> {
    await this.client.publish(topic, message);
  }

  async subscribe<T = any>(
    topic: string,
    onMessage: (msg: T) => Promise<void>,
  ): Promise<void> {
    await this.client.consume(topic, onMessage);
  }
}
