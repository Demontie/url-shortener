import Fastify, { type FastifyInstance } from 'fastify';
import { shortenerRoutes } from './routes/shortener.routes';

export class FastifyServer {
  private _app!: FastifyInstance;

  constructor() {
    this._app = Fastify({
      logger: true,
    });
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this._app.register(shortenerRoutes, { prefix: '/api/shorteners' });
  }

  async start(port: number = 3000): Promise<void> {
    try {
      await this._app.listen({ port });
      console.log(`🚀 Server running on port ${port}`);
    } catch (error) {
      console.error('Error starting server:', error);
      process.exit(1);
    }
  }

  async close(): Promise<void> {
    await this._app.close();
  }

  get app(): FastifyInstance {
    return this._app;
  }
}
