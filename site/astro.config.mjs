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
  /* Astro's own cross-origin check matches the Origin header against the URL
     the function reconstructs for itself, and behind Vercel's proxy those do
     not agree: every form-encoded POST to /api/enquiry came back 403 whatever
     Origin it carried, which is to say the no-JavaScript fallback has never
     once worked in production. It went unnoticed because the form's script
     posted JSON, a content type the check exempts.

     The check is worth having, so it moves rather than goes: the endpoint
     makes the same comparison against the Host header, which is the one thing
     the proxy passes through intact. Those two routes are the only ones that
     are not static, and only one of them takes a POST. */
  security: { checkOrigin: false },
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
