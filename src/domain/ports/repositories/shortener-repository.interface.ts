// import type { IBaseRepository } from '@/domain/core/repository.base';
import type { Shortener } from '@/domain/entities/shortener.entity';

export interface IShortenerRepository {
  // extends IBaseRepository<Shortener>
  findByShortCode(shortCode: string): Promise<Shortener | null>;
  create(entity: Shortener): Promise<Shortener>;
}
