import { UserCreated } from '@/domain/events/domain-event/user-created.event';

import { UserCreatedIntegrationEvent } from '@/domain/events/integration-event/user-created.integration.event';
import { UserCreatedDomainEventHandler } from '@/infra/handlers/user-created-domain-event.handler';
import type { IntegrationEventsPublisher } from '@/infra/messaging/integration-events.publisher';
import type { DomainEventManager } from '@/shared/domain-event-emitter';

export class DomainEventRegistrationService {
  constructor(
    private readonly domainEventManager: DomainEventManager,
    private readonly integrationEventsPublisher: IntegrationEventsPublisher,
  ) { }

  /**
   * Registra todos os handlers de eventos de domínio
   */
  registerDomainEvent(): void {
    const userCreatedHandler = new UserCreatedDomainEventHandler();
    const domainEvents = [
      {
        event: UserCreated.name,
        handler: (data: UserCreated) => userCreatedHandler.handle(data),
      }
    ];

    domainEvents.forEach(({ event, handler }) => {
      this.domainEventManager.register(event, handler);
    });

    console.log('✅ Domain event handlers registered');
  }

  /**
   * Registra todos os handlers de eventos de integração
   */
  registerIntegrationEvent(): void {
    // ✅ Múltiplos eventos de forma limpa
    const integrationEvents = [
      {
        event: UserCreated.name,
        handler: async (event: UserCreated) => {
          const integrationEvent = new UserCreatedIntegrationEvent(event);
          await this.integrationEventsPublisher.handle(integrationEvent);
        },
      },
      // No integration event for ServiceRequest yet
    ];

    integrationEvents.forEach(({ event, handler }) => {
      this.domainEventManager.registerForIntegrationEvent(event, handler);
    });

    console.log('✅ Integration event handlers registered');
  }
}
