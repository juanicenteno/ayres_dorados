import { defineConfig } from 'astro/config';
import node from '@astrojs/node'; // O vercel, netlify, etc.
import react from '@astrojs/react';

export default defineConfig({
  output: 'server', // <--- IMPORTANTE: o 'hybrid'
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [react()],
});