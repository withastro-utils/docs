import {defineConfig} from 'astro/config';
import starlight from '@astrojs/starlight';

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
    site: 'https://withastro-utils.github.io',
    base: '/docs',
    integrations: [expressiveCode(), starlight({
        editLink: {
            baseUrl: 'https://github.com/withastro-utils/docs/tree/main/',
        },
        lastUpdated: true,
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
            items: [{
                label: 'Forms',
                items: [
                    {
                        label: 'Getting Started',
                        link: '/guides/forms/getting-started'
                    }, {
                        label: 'Data Binding',
                        link: '/guides/forms/data-binding'
                    }, {
                    label: 'JS Helpers',
                    link: '/guides/forms/js-helpers'
                    }
                ]
            }, {
                label: 'Context',
                link: '/guides/context'
            }, {
                label: 'Express Endpoints',
                link: '/guides/express-endpoints'
            }]
        }, {
            label: 'Reference',
            autogenerate: {
                directory: 'reference/forms'
            }
        }],
        customCss: ['./src/styles/home.css', './src/styles/code-margin.css']
    })]
});
