import 'dotenv/config';
import { ConfigService } from './infra/config/config.service';

// Instância global da aplicação para graceful shutdown
let configService: ConfigService;

async function bootstrap() {
  try {
    configService = new ConfigService();
    await configService.initialize();
  } catch (error) {
    console.error('❌ Failed to start application:', error);
    process.exit(1);
  }
}

/**
 * Para a aplicação de forma graceful
 */
async function gracefulShutdown(signal: string): Promise<void> {
  console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);

  try {
    if (configService) {
      await configService.shutdown();
    }
    console.log('✅ Graceful shutdown completed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during graceful shutdown:', error);
    process.exit(1);
  }
}

// Configurar handlers para graceful shutdown
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handler para erros não capturados
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  gracefulShutdown('uncaughtException');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  gracefulShutdown('unhandledRejection');
});

// Iniciar aplicação
bootstrap();
