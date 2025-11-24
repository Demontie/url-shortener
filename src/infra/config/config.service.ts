import { DomainEventManager } from '@/shared/domain-event-emitter';
import { RedisClientService } from '../cache/redis/redis-client';
import { CassandraClientService } from '../db/cassandra/cassandra-client';
import { FastifyServer } from '../http/fastify/server';
import { IntegrationEventsPublisher } from '../messaging/integration-events.publisher';
import { MessageBroker } from '../messaging/message-broker';
import { RabbitMQClient } from '../messaging/rabbitmq/rabbitmq-client';
import { SubscriberManager } from '../messaging/subscribers/subscriber-manager';
import { Config } from './config';
import { DomainEventRegistrationService } from './domain-event/domain-event-registration.service';

export class ConfigService {
  private server: FastifyServer;
  private dbService: CassandraClientService;
  private cacheService: RedisClientService;
  private rabbitMQClient: RabbitMQClient;
  private messageBroker: MessageBroker;
  private subscriberManager: SubscriberManager;
  private doaminEventRegistrationService: DomainEventRegistrationService;

  private domainEventManager: DomainEventManager;
  private integrationEventsPublisher: IntegrationEventsPublisher;
  private config: Config;

  constructor() {
    /** Config */
    this.config = Config.getInstance();

    /** Database Service */
    this.dbService = CassandraClientService.getInstance();

    /** Cache Service */
    const redisUrl = this.config.getConfig().redis.url;
    this.cacheService = RedisClientService.getInstance(redisUrl);

    /** Message Broker */
    this.rabbitMQClient = new RabbitMQClient();
    this.messageBroker = new MessageBroker(this.rabbitMQClient);
    this.integrationEventsPublisher = new IntegrationEventsPublisher(
      this.messageBroker,
    );

    /* Domain Event Manager */
    this.domainEventManager = DomainEventManager.getInstance();
    this.doaminEventRegistrationService = new DomainEventRegistrationService(
      this.domainEventManager,
      this.integrationEventsPublisher,
    );
    this.subscriberManager = new SubscriberManager(this.messageBroker);

    /** HTTP Server */
    this.server = new FastifyServer();
  }

  /**
   * Inicializa todos os serviços da aplicação
   */
  async initialize(): Promise<void> {
    try {
      console.log('🚀 Starting application initialization...');

      // Conectar ao MongoDB
      await this.connectToDatabase();

      // Conectar ao Redis
      await this.connectToCache();

      // Conectar ao RabbitMQ
      await this.connectToMessageBroker();

      // Registrar eventos
      this.registerEvents();

      // Iniciar consumers
      await this.startConsumers();

      // Iniciar servidor HTTP
      await this.startHttpServer();

      console.log('✅ Application initialized successfully');
    } catch (error) {
      console.error('❌ Error during application initialization:', error);
      await this.cleanup();
      throw error;
    }
  }

  /**
   * Conecta ao banco de dados Cassandra
   */
  private async connectToDatabase(): Promise<void> {
    try {
      this.dbService.connect();
      const result = await this.dbService.verifyConnection();
      console.log('Database connection result:', result);
      if (!result) {
        throw new Error('Database connection failed');
      }
      console.log('✅ Database connected');
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      throw error;
    }
  }

  /**
   * Conecta ao banco de dados MongoDB
   */
  private async connectToCache(): Promise<void> {
    try {
      this.cacheService.connect();
      console.log('✅ Redis connected');
    } catch (error) {
      console.error('❌ Redis connection failed:', error);
      throw error;
    }
  }

  /**
   * Conecta ao message broker RabbitMQ
   */
  private async connectToMessageBroker(): Promise<void> {
    try {
      const { rabbitMQ } = this.config.getConfig();
      await this.rabbitMQClient.connect(rabbitMQ.url);
      console.log('✅ RabbitMQ connected');
    } catch (error) {
      console.error('❌ RabbitMQ connection failed:', error);
      throw error;
    }
  }

  /**
   * Registra todos os eventos (domain e integration)
   */
  private registerEvents(): void {
    this.doaminEventRegistrationService.registerDomainEvent();
    this.doaminEventRegistrationService.registerIntegrationEvent();
  }

  /**
   * Inicia todos os consumers
   */
  private async startConsumers(): Promise<void> {
    await this.subscriberManager.startAllSubscribers();
  }

  /**
   * Inicia o servidor HTTP
   */
  private async startHttpServer(): Promise<void> {
    const { port } = this.config.getConfig();
    await this.server.start(port ?? 3000);
  }

  /**
   * Para a aplicação de forma graceful
   */
  async shutdown(): Promise<void> {
    try {
      console.log('🛑 Starting application shutdown...');

      // Parar subscribers
      await this.subscriberManager.stopAllSubscribers();

      // Fechar servidor HTTP
      if (this.server) {
        await this.server.close();
      }

      // Fechar conexões
      await this.cleanup();

      console.log('✅ Application shutdown completed');
    } catch (error) {
      console.error('❌ Error during application shutdown:', error);
      throw error;
    }
  }

  /**
   * Limpa recursos da aplicação
   */
  private async cleanup(): Promise<void> {
    try {
      // Aqui você pode adicionar limpeza de outros recursos
      // Por exemplo: fechar conexões de banco, message broker, etc.
      console.log('🧹 Cleaning up resources...');
    } catch (error) {
      console.error('❌ Error during cleanup:', error);
    }
  }

  /**
   * Retorna status da aplicação
   */
  getStatus(): {
    status: string;
    subscribers: Array<{ name: string; status: string }>;
    uptime: number;
  } {
    return {
      status: 'running',
      subscribers: this.subscriberManager.getSubscribersStatus(),
      uptime: process.uptime(),
    };
  }
}
