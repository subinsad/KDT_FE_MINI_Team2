import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // SWC 플러그인으로 변경

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/': 'http://15.164.19.60:8080',
    },
  },
});
