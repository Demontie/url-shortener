export interface IDomainEvent {
  aggregateId: string;
  occurredOn: Date;
  eventVersion: number;
}
