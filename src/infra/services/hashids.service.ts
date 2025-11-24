import Hashids from 'hashids';
import type { IHashidsService } from '@/domain/ports/services/hashids.interface';

export class HashidsService implements IHashidsService {
  private readonly hashids: Hashids;

  constructor(secret: string) {
    this.hashids = new Hashids(secret, 6);
  }

  encode(id: bigint | number): string {
    return this.hashids.encode(id);
  }

  decode(shortCode: string): bigint | number {
    const decoded = this.hashids.decode(shortCode)[0];
    return Number.isInteger(decoded) ? decoded : BigInt(decoded);
  }
}
