import * as z from 'zod';

export const createShortenerZodSchema = z.object({
  long_url: z.url('Invalid URL format'),
});

export const createShortenerValidator = z.toJSONSchema(
  createShortenerZodSchema,
);
delete createShortenerValidator.$schema;

export type CreateShortenerValidator = z.infer<typeof createShortenerZodSchema>;
