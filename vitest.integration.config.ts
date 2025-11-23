import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    testTimeout: 300000,
    hookTimeout: 300000,
    environment: 'node',
    setupFiles: ['./tests/integration/vitest.setup.ts'],
    include: ['tests/integration/**/*.{test,spec}.{js,ts}'],
    exclude: ['node_modules', 'dist', 'tests/unit/**/*'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage/integration',
      include: ['src/**/*'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.test.{js,ts}',
        'src/**/*.spec.{js,ts}',
        'src/domain/ports/**/*',
        'src/app/dtos/**/*',
        'src/infra/factories/**/*',
        'src/main.ts',
      ],
      // Integration tests não devem ter thresholds de cobertura
      thresholds: {},
    },
  },
  resolve: {
    alias: {
      '@/tests': resolve(__dirname, './tests'),
      '@': resolve(__dirname, './src'),
      '@/domain': resolve(__dirname, './src/domain'),
      '@/app': resolve(__dirname, './src/app'),
      '@/infra': resolve(__dirname, './src/infra'),
      '@/shared': resolve(__dirname, './src/shared'),
    },
  },
});
