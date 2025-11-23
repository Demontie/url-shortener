import type { IDomainEvent } from './domain-events/domain-event.interface';
import { Entity } from './entity.base';

export abstract class AggregateRoot extends Entity {
  private _events: IDomainEvent[] = [];

  get events(): IDomainEvent[] {
    return this._events;
  }

  protected addEvent(event: IDomainEvent): void {
    this._events.push(event);
  }

  public clearEvents(): void {
    this._events = [];
  }
}
