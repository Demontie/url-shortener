import type { IIntegrationEvent } from '@/domain/core/domain-events/integration-event.interface';
import type { IMessagePublisher } from '@/domain/ports/messaging/message-publisher.interface';

export class IntegrationEventsPublisher {
  constructor(private messageBroker: IMessagePublisher) {}

  async handle(job: IIntegrationEvent) {
    console.log('IntegrationEventsPublisher.handle', job.payload);
    await this.messageBroker.publish(job.eventName, job.payload);
  }
}
