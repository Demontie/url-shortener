export interface IEventHandler<T = any> {
  handle(event: T): Promise<void>;
}
