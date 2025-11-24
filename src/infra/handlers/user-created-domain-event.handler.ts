import type { UserCreated } from '@/domain/events/domain-event/user-created.event';

export class UserCreatedDomainEventHandler {
  async handle(event: UserCreated): Promise<void> {
    // Apenas processamento in-memory, sem mensageria
    console.log(`Sending welcome email to: ${event.aggregateId}`);
    console.log(
      `Email content: Welcome ${event.aggregateId}! Your account has been created.`,
    );

    console.log(`Welcome email sent to: ${event.aggregateId}`);
  }
}
