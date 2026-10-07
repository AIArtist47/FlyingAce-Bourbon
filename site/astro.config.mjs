import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://flyingacefarm.com',
  /* Still a static site: every page is built ahead of time. The adapter is
     here for the two routes that cannot be -- the inquiry endpoint, which has
     to send mail, and the page it hands a visitor back to -- and each of those
     opts out with `export const prerender = false`. Nothing else becomes a
     function. */
  output: 'static',
  adapter: vercel(),
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
