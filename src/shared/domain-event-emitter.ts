import { EventEmitter2 } from 'eventemitter2';
import type { AggregateRoot } from '@/domain/core/aggregate-root.base';

export class DomainEventManager {
  private static instance: DomainEventManager;
  domainEventsSubscriber: EventEmitter2;
  integrationEventsSubscriber: EventEmitter2;

  constructor() {
    this.domainEventsSubscriber = new EventEmitter2({
      wildcard: true,
    });
    this.integrationEventsSubscriber = new EventEmitter2({
      wildcard: true,
    });
  }

  static getInstance(): DomainEventManager {
    if (!DomainEventManager.instance) {
      DomainEventManager.instance = new DomainEventManager();
    }
    return DomainEventManager.instance;
  }

  register(event: string, handler: any) {
    this.domainEventsSubscriber.on(event, handler);
  }

  registerForIntegrationEvent(event: string, handler: any) {
    this.integrationEventsSubscriber.on(event, handler);
  }

  async publish(aggregateRoot: AggregateRoot) {
    // try {
    for (const event of aggregateRoot.events) {
      const eventClassName = event.constructor.name;
      await this.domainEventsSubscriber.emitAsync(eventClassName, event);
    }
    // } catch (error) {
    //   //TODO: publish failed events to a dead letter queue
    //   console.error('Error publishing domain event:', error);
    // }
  }

  async publishForIntegrationEvent(aggregateRoot: AggregateRoot) {
    // try {
    for (const event of aggregateRoot.events) {
      const eventClassName = event.constructor.name;
      await this.integrationEventsSubscriber.emitAsync(eventClassName, event);
    }
    // } catch (error) {
    //   // TODO: publish failed events to a dead letter queue
    //   console.error('Error publishing integration event:', error);
    // }
  }
}
