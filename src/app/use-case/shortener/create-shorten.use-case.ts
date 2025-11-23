import { Shortener } from '@/domain/entities/shortener.entity';
import type { IShortenerRepository } from '@/domain/ports/repositories/shortener-repository.interface';
import type { IHashidsService } from '@/domain/ports/services/hashids.interface';
import type { IShortCodeGeneratorService } from '@/domain/ports/services/short-code-generator.interface';
import type { CreateShortenDto } from '../../dtos/create-shorten.dto';

export class CreateShortenerUseCase {
  constructor(
    private shortenerRepository: IShortenerRepository,
    private shortCodeGenerator: IShortCodeGeneratorService,
    private hashidsService: IHashidsService,
  ) { }

  async execute(createUserDto: CreateShortenDto): Promise<Shortener> {
    const { longUrl } = createUserDto;

    const nextCode = await this.shortCodeGenerator.next();
    const shortCode = this.hashidsService.encode(nextCode);

    const newShortener = Shortener.create({
      longUrl,
      shortCode,
    });

    const savedShortener = await this.shortenerRepository.create(newShortener);

    return savedShortener;
  }
}
