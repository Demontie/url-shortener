export interface IIntegrationEvent<T = any> {
  eventName: string;
  payload: T;
  eventVersion: number;
  occurredOn: Date;
}
