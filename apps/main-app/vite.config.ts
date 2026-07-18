import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const federation = require('@originjs/vite-plugin-federation')

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      federation({
        name: 'mainApp',
        remotes: {
          musicLibrary: env.VITE_REMOTE_URL,
        },
        shared: ['react', 'react-dom', '@tanstack/react-query'],
      }),
    ],
    build: {
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
      modulePreload: false,
    },
    server: { port: 5000, cors: true },
    preview: { port: 5000, cors: true },
  }
})