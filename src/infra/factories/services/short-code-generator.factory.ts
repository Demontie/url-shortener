import type { IShortCodeGeneratorService } from '@/domain/ports/services/short-code-generator.interface';
import { RedisShortCodeGenerator } from '@/infra/services/shortcode-generator.service';

export class ShortCodeGeneratorFactory {
  static create(): IShortCodeGeneratorService {
    return new RedisShortCodeGenerator();
  }
}
