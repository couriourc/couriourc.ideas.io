import { defineConfig } from 'vite'
// Optimize the build for production
// UnoCss
import pluginConfig from './config/plugins'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: pluginConfig(),
  resolve: {
    alias: {
      '/@': '/src'
    }
  },
  server: {
    host: '::',
    open: true,
    cors: true
  }
})
