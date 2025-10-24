import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: {
        vanilla: resolve(__dirname, 'src/vanilla.ts'),
      },
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: ['vue', '@touchspin/core', '@touchspin/renderer-vanilla'],
    },
    sourcemap: true,
    target: 'es2020',
  },
})
