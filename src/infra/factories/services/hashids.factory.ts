import type { IHashidsService } from '@/domain/ports/services/hashids.interface';
import { HashidsService } from '@/infra/services/hashids.service';

export class HashidsFactory {
  static create(): IHashidsService {
    const secret = process.env.SECRET_KEY || 'url-shortener';
    return new HashidsService(secret);
  }
}
