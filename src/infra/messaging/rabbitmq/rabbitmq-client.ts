import amqp, { type Channel, type ChannelModel } from 'amqplib';

export class RabbitMQClient {
  private connection!: ChannelModel;
  private channel!: Channel;

  async connect(url: string): Promise<void> {
    if (this.connection) {
      return;
    }
    this.connection = await amqp.connect(url);
    this.channel = await this.connection.createChannel();
  }

  async publish<T = any>(queue: string, message: T): Promise<void> {
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });
  }

  async consume<T = any>(
    topic: string,
    onMessage: (msg: T) => Promise<void>,
  ): Promise<void> {
    await this.channel.assertQueue(topic, { durable: true });
    this.channel.consume(topic, async (msg: any) => {
      if (!msg) {
        return;
      }
      const content = JSON.parse(msg.content.toString());
      await onMessage(content);
      this.channel.ack(msg);
    });
  }

  async disconnect(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
      }
      if (this.connection) {
        await this.connection.close();
      }
    } catch (error) {
      console.error('Error disconnecting RabbitMQ:', error);
    }
  }
}
