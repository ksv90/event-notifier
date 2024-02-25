import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    minify: true,
    sourcemap: true,
    lib: {
      entry: './src/index.ts',
      name: 'event-notifier',
      formats: ['es'],
      fileName: 'index',
    },
  },
  plugins: [dts({ entryRoot: 'src' })],
});
