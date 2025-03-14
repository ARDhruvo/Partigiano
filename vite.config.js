import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.VITE_GMAP_KEY': JSON.stringify(env.VITE_GMAP_KEY)
    },
    plugins: [react()],
  }
})
