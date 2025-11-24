import type { FastifyInstance } from 'fastify';
import { ShortenerController } from '../controllers/shortener.controller';

export async function shortenerRoutes(fastify: FastifyInstance) {
  fastify.post('/shorten', ShortenerController.createShortener);
}
