import type { IShortenerRepository } from '@/domain/ports/repositories/shortener-repository.interface';
import { CassandraShortenerRepository } from '@/infra/db/cassandra/repositories/cassandra-shortener-repository';

export class ShortenerRepositoryFactory {
  static create(): IShortenerRepository {
    return new CassandraShortenerRepository();
  }
}
