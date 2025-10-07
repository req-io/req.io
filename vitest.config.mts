/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json', 'lcov'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        // Test files
        'src/**/*.test.{ts,tsx}',
        'src/**/*.spec.{ts,tsx}',
        'src/**/*.test-utils.{ts,tsx}',

        // Type definitions
        'src/**/*.d.ts',
        'src/vite-env.d.ts',

        // Entry points (usually not tested directly)
        'src/index.tsx',
        'src/App.tsx',
        'src/main.tsx',

        // Electron files
        'electron/**/*',

        // Build outputs
        'dist/**/*',
        'dist-electron/**/*',

        // Dependencies
        'node_modules/**/*',

        // Coverage reports
        'coverage/**/*',

        // Test setup files
        'tests/**/*',

        // Configuration files
        '**/*.config.{js,ts}',
        '**/*.setup.{js,ts}',
        'vite.config.ts',
        'vitest.config.ts',
        'tsconfig*.json',
        'electron-builder.json5',

        // Styles and assets
        'src/**/*.scss',
        'src/**/*.css',
        'src/**/*.svg',
        'src/**/*.png',
        'src/**/*.jpg',
        'src/**/*.jpeg',
        'src/**/*.gif',
        'src/**/*.ico',
      ],
      all: true,
      thresholds: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70,
        },
        // Per-file thresholds for critical files
        'src/components/**/*.{ts,tsx}': {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
        'src/api/**/*.{ts,tsx}': {
          branches: 85,
          functions: 85,
          lines: 85,
          statements: 85,
        },
      },
      clean: true,
      cleanOnRerun: true,
      // Watermarks for different coverage levels
      watermarks: {
        statements: [50, 80],
        functions: [50, 80],
        branches: [50, 80],
        lines: [50, 80],
      },
    },
    // Test timeout
    testTimeout: 10000,

    // Watch mode configuration
    watch: false,

    // Reporter configuration
    reporter: ['verbose', 'json'],
    outputFile: {
      json: './coverage/test-results.json',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
