import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  integrations: [expressiveCode(), starlight({
    favicon: '/favicon.png',
    title: 'Astro Utils',
    logo: {
      src: '/src/assets/logo.png'
    },
    social: {
      github: 'https://github.com/withastro-utils/utils'
    },
    sidebar: [{
      label: 'Guides',
      autogenerate: {
        directory: 'guides'
      }
    }, {
      label: 'Reference',
      autogenerate: {
        directory: 'reference'
      }
    }],
    customCss: ['./src/styles/home.css', './src/styles/code-margin.css']
  })]
});
