export interface IConfig {
  port: number;
  secretKey: string;
  redis: {
    url: string;
  };
  rabbitMQ: {
    url: string;
  };
  database: {
    contactPoints: string[];
    localDataCenter: string;
    keyspace: string;
  };
  environment: string;
}

export class Config {
  private static instance: Config;
  private config: IConfig;

  private constructor() {
    this.config = this.loadConfig();
  }

  static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  loadConfig(): IConfig {
    const port = parseInt(process.env.PORT || '4000', 10);
    const rabbitMQUrl = process.env.RABBITMQ_URL || '';
    const redisUrl = process.env.REDIS_URL || '';
    const contactPoints = process.env.DATABASE_CONTACT_POINTS?.split(',') || [];
    const localDataCenter = process.env.DATABASE_LOCAL_DATACENTER || '';
    const keyspace = process.env.DATABASE_KEYSPACE || '';

    const secretKey = process.env.SECRET_KEY;
    const environment = process.env.NODE_ENV;

    if (!rabbitMQUrl) {
      throw new Error('RABBITMQ_URL environment variable is required');
    }

    if (!contactPoints.length) {
      throw new Error(
        'DATABASE_CONTACT_POINTS environment variable is required',
      );
    }

    if (!localDataCenter) {
      throw new Error(
        'DATABASE_LOCAL_DATACENTER environment variable is required',
      );
    }

    if (!keyspace) {
      throw new Error('DATABASE_KEYSPACE environment variable is required');
    }

    if (!secretKey) {
      throw new Error('SECRET_KEY environment variable is required');
    }

    if (!environment) {
      throw new Error('NODE_ENV environment variable is required');
    }

    if (!redisUrl) {
      throw new Error('REDIS_URL environment variable is required');
    }

    // Atualiza o estado interno para refletir mudanças de ambiente em runtime
    this.config = {
      port,
      secretKey,
      redis: {
        url: redisUrl,
      },
      rabbitMQ: {
        url: rabbitMQUrl,
      },
      database: {
        contactPoints,
        localDataCenter,
        keyspace,
      },
      environment,
    };

    return this.config;
  }

  getConfig(): IConfig {
    return this.config;
  }

  isDevelopment(): boolean {
    return this.config.environment === 'development';
  }

  isProduction(): boolean {
    return this.config.environment === 'production';
  }

  isTesting(): boolean {
    return this.config.environment === 'testing';
  }
}
