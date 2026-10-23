import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // CI pods see the node's 48 CPUs but are limited to 4, so an uncapped
    // vitest starts ~47 workers. Override locally with VITEST_MAX_WORKERS.
    maxWorkers: Number(process.env.VITEST_MAX_WORKERS) || 4,
    globals: true,
    setupFiles: ['./testutils/setupFiles.ts'],
    include: ['./src/**/*.spec.ts'],
  },
});
