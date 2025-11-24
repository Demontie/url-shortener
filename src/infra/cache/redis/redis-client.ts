import { createClient, type RedisClientType } from 'redis';

let redisClientServiceInstance: RedisClientService | undefined;

export class RedisClientService {
  private uri: string | undefined;
  private client: RedisClientType | undefined;

  constructor(uri?: string) {
    this.uri = uri || process.env.REDIS_URL;
  }

  // Singleton pattern
  static getInstance(uri?: string): RedisClientService {
    if (!redisClientServiceInstance) {
      redisClientServiceInstance = new RedisClientService(uri);
    }
    return redisClientServiceInstance;
  }

  async connect() {
    if (this.client) {
      return;
    }
    this.client = createClient({ url: this.uri });

    await this.client.connect();
  }

  getClient(): RedisClientType {
    if (!this.client?.isOpen) {
      throw new Error('Redis client not initialized');
    }
    return this.client;
  }

  disconnect(): void {
    if (!this.client?.isOpen) {
      return;
    }
    this.client.destroy();
    this.client = undefined;
    redisClientServiceInstance = undefined;
  }
}
