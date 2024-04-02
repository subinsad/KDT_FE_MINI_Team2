import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // SWC 플러그인으로 변경
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/public-api': {
        target: 'http://15.164.19.60:8080/',
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: 'http://15.164.19.60:8080/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});