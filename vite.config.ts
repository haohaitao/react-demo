/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 第三个参数传 '' 表示加载所有环境变量（不只是 VITE_ 前缀的），
  // 这样代理目标可以用不带前缀的 PROXY_TARGET，避免把源站地址打进前端产物。
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    server: {
      port: 3000,
      open: true,
      // 对应原 CRA 的 src/setupProxy.js
      proxy: {
        '/api': {
          target: env.PROXY_TARGET || 'https://www.haohaitao.cn/',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },

    build: {
      outDir: 'dist',
      sourcemap: mode !== 'production',
      rollupOptions: {
        output: {
          // 把体积大且不常变的依赖拆出来，利用长期缓存
          manualChunks: {
            react: ['react', 'react-dom', 'react-router'],
            antd: ['antd', '@ant-design/icons'],
            query: ['@tanstack/react-query'],
          },
        },
      },
    },

    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      css: true,
      coverage: {
        reporter: ['text', 'html'],
        exclude: ['src/test/**', '**/*.d.ts', '**/*.config.*'],
      },
    },
  };
});
