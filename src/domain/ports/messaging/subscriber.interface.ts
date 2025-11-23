export interface ISubscriber {
  readonly name: string;
  readonly topic: string;
  start(): Promise<void>;
  stop(): Promise<void>;
  isRunning(): boolean;
}
