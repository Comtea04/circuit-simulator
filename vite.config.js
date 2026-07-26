import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages는 https://<user>.github.io/<repo>/ 하위 경로로 서빙되므로
// 에셋 경로 기준을 저장소 이름으로 맞춘다.
export default defineConfig({
  base: '/circuit-simulator/',
  plugins: [react()],
});
