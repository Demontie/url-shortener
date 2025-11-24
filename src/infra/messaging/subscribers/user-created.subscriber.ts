import { UserCreatedIntegrationEvent } from '@/domain/events/integration-event/user-created.integration.event';
import type { IMessageSubscriber } from '@/domain/ports/messaging/message-subscriber.interface';
import type { ISubscriber } from '@/domain/ports/messaging/subscriber.interface';

export class UserCreatedSubscriber implements ISubscriber {
  public readonly name = UserCreatedSubscriber.name;
  public readonly topic = UserCreatedIntegrationEvent.getEventName();
  private isSubscriberRunning = false;

  constructor(private readonly messageBroker: IMessageSubscriber) {}

  async start(): Promise<void> {
    if (this.isSubscriberRunning) {
      console.warn(`⚠️ ${this.name} is already running`);
      return;
    }

    this.messageBroker.subscribe(this.topic, async (message) => {
      await this.handleMessage(message);
    });

    this.isSubscriberRunning = true;
    console.log(`🔄 ${this.name} started`);
  }

  async stop(): Promise<void> {
    this.isSubscriberRunning = false;
    console.log(`🛑 ${this.name} stopped`);
  }

  isRunning(): boolean {
    return this.isSubscriberRunning;
  }

  private async handleMessage(message: any): Promise<void> {
    try {
      console.log(`📨 ${this.name} processing:`, message);
      await this.processConsumerCreated(message);
      console.log(`✅ ${this.name} processed successfully`);
    } catch (error) {
      console.error(`❌ ${this.name} error:`, error);
      // Aqui você pode implementar retry logic ou dead letter queue
      throw error;
    }
  }

  /**
   * Processa o evento de confirmação de criação de consumidor
   */
  private async processConsumerCreated(message: any): Promise<void> {
    console.log(`Processing consumer created with id: ${message.consumerId}`);

    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}
