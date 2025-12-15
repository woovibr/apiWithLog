import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      source: {
        entry: {
          index: './src/index.ts',
        },
      },
      format: 'esm',
      syntax: ['node 20'],
      dts: {
        tsgo: true,
        abortOnError: false,
      },
    },
  ],
});
