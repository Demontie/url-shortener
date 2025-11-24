import type { IMessageSubscriber } from '@/domain/ports/messaging/message-subscriber.interface';
import type { ISubscriber } from '@/domain/ports/messaging/subscriber.interface';
import { UserCreatedSubscriber } from '@/infra/messaging/subscribers/user-created.subscriber';

export class SubscriberFactory {
  static getSubscribers(messageBroker: IMessageSubscriber): ISubscriber[] {
    return [new UserCreatedSubscriber(messageBroker)];
  }
}
