import type { RedisClientType } from 'redis';
import type { IShortCodeGeneratorService } from '@/domain/ports/services/short-code-generator.interface';
import { RedisClientService } from '../cache/redis/redis-client';

export class RedisShortCodeGenerator implements IShortCodeGeneratorService {
  private client: RedisClientType;

  constructor() {
    const instance = RedisClientService.getInstance();
    this.client = instance.getClient();
  }

  async next(): Promise<number> {
    await this.client.setNX('shortener:seq', '13999999');
    const seq = await this.client.incr('shortener:seq');
    return seq;
  }
}
