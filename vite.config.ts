import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    minify: true,
    sourcemap: true,
    lib: {
      entry: './src/index.ts',
      name: 'notifier',
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
  },
  plugins: [dts({ entryRoot: 'src' })],
});
