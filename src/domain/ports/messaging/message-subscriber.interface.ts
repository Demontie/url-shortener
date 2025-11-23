export interface IMessageSubscriber {
  subscribe(topic: string, onMessage: (message: any) => Promise<void>): void;
}
