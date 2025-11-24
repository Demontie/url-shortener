import type { IMessageSubscriber } from '@/domain/ports/messaging/message-subscriber.interface';
import type { ISubscriber } from '@/domain/ports/messaging/subscriber.interface';
import { SubscriberFactory } from '@/infra/factories/messaging/subscriber.factory';

export class SubscriberManager {
  private subscribers: Map<string, ISubscriber> = new Map();

  constructor(private readonly messageBrokerSub: IMessageSubscriber) {}

  /**
   * Registra e inicia todos os subscribers
   */
  async startAllSubscribers(): Promise<void> {
    try {
      const subscribers = SubscriberFactory.getSubscribers(
        this.messageBrokerSub,
      );

      // Iniciar subscribers em paralelo
      await Promise.all(
        subscribers.map((subscriber) => this.startSubscriber(subscriber)),
      );

      console.log('✅ All subscribers started successfully');
    } catch (error) {
      console.error('❌ Error starting subscribers:', error);
      await this.stopAllSubscribers(); // Rollback em caso de erro
      throw error;
    }
  }

  /**
   * Para todos os subscribers (graceful shutdown)
   */
  async stopAllSubscribers(): Promise<void> {
    try {
      console.log('🛑 Stopping all subscribers...');

      const stopPromises = Array.from(this.subscribers.values()).map(
        (subscriber) => this.stopSubscriber(subscriber),
      );

      await Promise.allSettled(stopPromises);

      this.subscribers.clear();
      console.log('✅ All subscribers stopped');
    } catch (error) {
      console.error('❌ Error stopping subscribers:', error);
      throw error;
    }
  }

  /**
   * Retorna status detalhado dos subscribers
   */
  getSubscribersStatus(): Array<{
    name: string;
    topic: string;
    status: string;
    running: boolean;
  }> {
    return Array.from(this.subscribers.values()).map((subscriber) => ({
      name: subscriber.name,
      topic: subscriber.topic,
      status: subscriber.isRunning() ? 'running' : 'stopped',
      running: subscriber.isRunning(),
    }));
  }

  /**
   * Reinicia um subscriber específico
   */
  async restartSubscriber(subscriberName: string): Promise<void> {
    const subscriber = this.subscribers.get(subscriberName);
    if (!subscriber) {
      throw new Error(`Subscriber ${subscriberName} not found`);
    }

    await this.stopSubscriber(subscriber);
    await this.startSubscriber(subscriber);
  }

  private async startSubscriber(subscriber: ISubscriber): Promise<void> {
    try {
      await subscriber.start();
      this.subscribers.set(subscriber.name, subscriber);
      console.log(`✅ ${subscriber.name} registered and started`);
    } catch (error) {
      console.error(`❌ Failed to start ${subscriber.name}:`, error);
      throw error;
    }
  }

  private async stopSubscriber(subscriber: ISubscriber): Promise<void> {
    try {
      await subscriber.stop();
      console.log(`🛑 ${subscriber.name} stopped`);
    } catch (error) {
      console.error(`❌ Error stopping ${subscriber.name}:`, error);
    }
  }
}
