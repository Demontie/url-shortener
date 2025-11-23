import type { IDomainEvent } from '@/domain/core/domain-events/domain-event.interface';

export class UserCreated implements IDomainEvent {
  readonly eventVersion: number = 1;
  readonly occurredOn: Date;

  constructor(public readonly aggregateId: string) {
    this.occurredOn = new Date();
  }
}
