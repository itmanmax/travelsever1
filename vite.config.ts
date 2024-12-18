import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://travelsever1.maxtral.fun',
        changeOrigin: true,
        // 不需要重写路径，因为我们的API基础路径已经包含/api
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
