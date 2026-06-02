import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const vendorChunkMap = {
  react: 'react-vendor',
  'react-dom': 'react-vendor',
  'react-router': 'react-vendor',
  'react-router-dom': 'react-vendor',
  'framer-motion': 'motion',
  recharts: 'charts',
  'lucide-react': 'icons',
  '@emailjs/browser': 'emailjs',
  'react-helmet-async': 'helmet'
};

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    chunkSizeWarningLimit: 800,
    rolldownOptions: {
      output: {
        manualChunks: (id) => {
          if (!id.includes('node_modules')) return;
          for (const [key, chunk] of Object.entries(vendorChunkMap)) {
            if (id.includes(`/node_modules/${key}/`)) return chunk;
          }
        }
      }
    }
  }
});
