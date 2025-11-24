import type { FastifyReply, FastifyRequest } from 'fastify';
import { CreateShortenerUseCase } from '@/app/use-case/shortener/create-shorten.use-case';
import { GetShortenerUseCase } from '@/app/use-case/shortener/get-shorten.use-case';
import { ShortenerRepositoryFactory } from '@/infra/factories/repositories/shortener-repository.factory';
import { HashidsFactory } from '@/infra/factories/services/hashids.factory';
import { ShortCodeGeneratorFactory } from '@/infra/factories/services/short-code-generator.factory';
import { ValidationService } from '@/shared/validation/validation.service';
import {
  type CreateShortenerValidator,
  createShortenerZodSchema,
} from '../validators/shortener/create-shortener.validator';

export class ShortenerController {
  static async createShortener(req: FastifyRequest, res: FastifyReply) {
    try {
      console.log('Creating shortener...');
      const validatedBody =
        ValidationService.validate<CreateShortenerValidator>(
          createShortenerZodSchema,
          req.body as CreateShortenerValidator,
        );
      console.log(validatedBody, 'validatedBody');
      if (Array.isArray(validatedBody)) {
        return res.status(400).send(validatedBody);
      }

      const createShortenerUseCase = new CreateShortenerUseCase(
        ShortenerRepositoryFactory.create(),
        ShortCodeGeneratorFactory.create(),
        HashidsFactory.create(),
      );

      const result = await createShortenerUseCase.execute({
        longUrl: validatedBody.long_url,
      });

      res.status(200).send({
        short_url: `http://localhost:3000/${result.shortCode}`,
      });
    } catch (error: any) {
      res.status(400).send({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  static async getShortener(req: FastifyRequest, res: FastifyReply) {
    try {
      const { shortCode } = req.params as any;

      const getShortenerUseCase = new GetShortenerUseCase(
        ShortenerRepositoryFactory.create(),
        HashidsFactory.create(),
      );
      const shortener = await getShortenerUseCase.execute(shortCode);

      return res.code(302).redirect(shortener.longUrl);
    } catch (error: any) {
      res.status(400).send({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}
