import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from "rollup-plugin-visualizer";

const manualChunks = (path) =>
  path
    .split('/')
    .reverse()[
      path.split('/').reverse().indexOf('node_modules') - 1
    ]

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          vue: 'react',
        },
      },
      plugins: [visualizer({
        gzipSize: true,
        template: 'treemap'
      })],
    },
  },
})
