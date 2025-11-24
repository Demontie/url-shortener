import type { Shortener } from '@/domain/entities/shortener.entity';
import type { IShortenerRepository } from '@/domain/ports/repositories/shortener-repository.interface';
import type { IHashidsService } from '@/domain/ports/services/hashids.interface';

export class GetShortenerUseCase {
  constructor(
    private shortenerRepository: IShortenerRepository,
    private hashidsService: IHashidsService,
  ) {}

  async execute(shortCode: string): Promise<Shortener> {
    const shortCodeNumber = this.hashidsService.decode(shortCode);
    if (!shortCodeNumber) {
      throw new Error('Invalid short code');
    }

    const shortener = await this.shortenerRepository.findByShortCode(shortCode);
    if (!shortener) {
      throw new Error('Shortener not found');
    }
    return shortener;
  }
}
