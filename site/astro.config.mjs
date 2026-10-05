import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://flyingacefarm.com',
  output: 'static',
  build: { inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            motion: ['gsap', 'gsap/ScrollTrigger', 'lenis'],
          },
        },
      },
    },
  },
});
