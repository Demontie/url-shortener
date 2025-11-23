import type { IIntegrationEvent } from '@/domain/core/domain-events/integration-event.interface';
import type { UserCreated } from '../domain-event/user-created.event';

const eventName = 'user.created';
export class UserCreatedIntegrationEvent
  implements IIntegrationEvent<UserCreated>
{
  readonly eventVersion: number = 1;
  readonly occurredOn: Date;
  readonly eventName: string = eventName;
  readonly payload: any;

  constructor(domainEvent: UserCreated) {
    this.occurredOn = new Date();
    this.payload = {
      aggregateId: domainEvent.aggregateId,
    };
  }

  static getEventName(): string {
    return eventName;
  }
}
