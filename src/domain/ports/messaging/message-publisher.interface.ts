export interface IMessagePublisher {
  publish(topic: string, message: any): Promise<void>;
}
