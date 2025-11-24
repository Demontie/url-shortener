import type { Client } from 'cassandra-driver';
import { Shortener } from '@/domain/entities/shortener.entity';
import type { IShortenerRepository } from '@/domain/ports/repositories/shortener-repository.interface';
import { CassandraClientService } from '../cassandra-client';

export class CassandraShortenerRepository implements IShortenerRepository {
  protected db: Client;

  constructor() {
    const instance = CassandraClientService.getInstance();
    this.db = instance.getClient();
  }

  async findByShortCode(shortCode: string): Promise<Shortener | null> {
    const query = 'SELECT * FROM shorteners WHERE short_code = ?';
    const params = [shortCode];

    const result = await this.db.execute(query, params, { prepare: true });
    if (result.rows.length === 0) {
      return null;
    }

    return this.toDomain(result.rows[0]);
  }

  toDomain(dbShortener: any): Shortener {
    return Shortener.create({
      shortCode: dbShortener.short_code,
      longUrl: dbShortener.long_url,
      createdAt: dbShortener.created_at,
    });
  }

  async create(entity: Shortener): Promise<Shortener> {
    const query =
      'INSERT INTO shorteners (short_code, long_url, created_at) VALUES (?, ?, ?)';
    const params = [entity.shortCode, entity.longUrl, entity.createdAt];

    await this.db.execute(query, params, { prepare: true });

    return entity;
  }
}
