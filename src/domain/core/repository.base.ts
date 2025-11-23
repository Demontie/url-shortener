import type { Entity } from './entity.base';

export interface IBaseRepository<TEntity extends Entity> {
  create(entity: TEntity): Promise<TEntity>;
  findById(id: string): Promise<TEntity | null>;
  findAll(): Promise<TEntity[]>;
  update(entity: Partial<TEntity>): Promise<{ id: string } | null>;
}
