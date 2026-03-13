import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const isProduction = mode === 'production';
  
  return {
    base: '/',
    server: {
      port: 3004,
      host: '0.0.0.0',
      open: false
    },
    plugins: [react()],
    
    // Build optimizations
    build: {
      target: 'es2020',
      minify: isProduction ? 'terser' : false,
      sourcemap: !isProduction,
      
      // Chunk optimization
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            motion: ['framer-motion'],
            icons: ['lucide-react'],
            lottie: ['@lottiefiles/react-lottie-player']
          },
          
          // Asset optimization
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
              return `media/[name]-[hash][extname]`;
            }
            if (/\.(png|jpe?g|gif|svg|webp|avif)(\?.*)?$/i.test(assetInfo.name)) {
              return `images/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          }
        }
      },
      
      // Compression for production
      ...(isProduction && {
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        }
      })
    },
    
    // Dependencies optimization
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'framer-motion',
        'lucide-react',
        '@lottiefiles/react-lottie-player'
      ]
    },
    
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
        '@components': resolve(__dirname, './components'),
        '@hooks': resolve(__dirname, './hooks'),
        '@services': resolve(__dirname, './services'),
        '@types': resolve(__dirname, './types'),
        '@assets': resolve(__dirname, './assets')
      }
    },
    
    // CSS configuration
    css: {
      devSourcemap: false
    }
  };
});