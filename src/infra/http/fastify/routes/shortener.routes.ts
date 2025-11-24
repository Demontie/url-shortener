import type { FastifyInstance } from 'fastify';
import { ShortenerController } from '../controllers/shortener.controller';

export async function shortenerRoutes(fastify: FastifyInstance) {
  fastify.post('/api/v1/shorten', ShortenerController.createShortener);
  fastify.get('/:shortCode', ShortenerController.getShortener);
}
