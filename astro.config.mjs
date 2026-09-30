import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
    site: 'https://withastro-utils.github.io',
    base: '/docs',
    integrations: [sitemap({ filter: page => !page.includes('/previews/') && !page.includes('/social/') && !/\.(md|txt)$/.test(page) }), starlight({
        components: {
            Header: './src/components/Header.astro',
            Head: './src/components/Head.astro',
            MobileMenuFooter: './src/components/MobileMenuFooter.astro',
            Hero: './src/components/Hero.astro',
            PageTitle: './src/components/PageTitle.astro'
        },
        credits: false,
        editLink: {
            baseUrl: 'https://github.com/withastro-utils/docs/edit/main/',
        },
        lastUpdated: true,
        disable404Route: true,
        favicon: '/favicon.svg',
        title: 'Astro Utils',
        description: 'Server forms, state, validation, uploads, and Express-style endpoints for Astro.',
        head: [
            { tag: 'meta', attrs: { name: 'theme-color', content: '#0b6ead' } },
            { tag: 'meta', attrs: { property: 'og:site_name', content: 'Astro Utils' } },
            { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
            { tag: 'meta', attrs: { property: 'og:image', content: 'https://withastro-utils.github.io/docs/social/astro-utils.webp' } },
            { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
            { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
            { tag: 'meta', attrs: { property: 'og:image:alt', content: 'Astro Utils request lifecycle: bind, validate, act, and restore' } },
            { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
            { tag: 'meta', attrs: { name: 'twitter:image', content: 'https://withastro-utils.github.io/docs/social/astro-utils.webp' } }
        ],
        logo: {
            src: '/src/assets/brand-mark.svg'
        },
        pagefind: {
            ranking: {
                pageLength: 0.05,
                termFrequency: 0.2,
                termSaturation: 1.4,
                termSimilarity: 9,
                diacriticSimilarity: 0.8
            }
        },
        social: [{
            icon: 'github',
            label: 'GitHub',
            href: 'https://github.com/withastro-utils/utils'
        }],
        sidebar: [
            {
                label: 'Start',
                items: [{
                    label: 'Overview',
                    link: '/'
                }, {
                    label: 'Examples',
                    link: '/examples'
                }]
            },
            {
                label: 'Forms',
                items: [
                    {
                        label: 'Getting Started',
                        link: '/guides/forms/getting-started'
                    }, {
                        label: 'Binding & Validation',
                        link: '/guides/forms/data-binding'
                    }, {
                        label: 'Loops & Reusable Components',
                        link: '/guides/forms/loops-and-components'
                    }, {
                        label: 'Server Helpers',
                        link: '/guides/forms/js-helpers'
                    }
                ]
            },
            {
                label: 'Context',
                items: [{
                    label: 'Overview & Quickstart',
                    link: '/guides/context'
                }, {
                    label: 'API',
                    link: '/reference/context'
                }]
            },
            {
                label: 'Express Endpoints',
                items: [{
                    label: 'Overview & Quickstart',
                    link: '/guides/express-endpoints'
                }, {
                    label: 'Router & Errors',
                    link: '/reference/express/router-and-errors'
                }, {
                    label: 'Request',
                    link: '/reference/express/request'
                }, {
                    label: 'Response',
                    link: '/reference/express/response'
                }]
            },
            {
                label: 'Forms reference',
                items: [{
                    label: 'Imports',
                    link: '/reference/forms'
                }, {
                    label: 'Configuration',
                    link: '/reference/forms/configuration'
                }, {
                    label: 'Advanced responses',
                    link: '/reference/forms/advanced-responses'
                }, {
                    label: 'Basic components',
                    link: '/reference/forms/basic-form-components'
                }, {
                    label: 'Data binding',
                    link: '/reference/forms/data-binding'
                }, {
                    label: 'Events and triggers',
                    link: '/reference/forms/events-and-triggers'
                }, {
                    label: 'Session',
                    link: '/reference/forms/session'
                }, {
                    label: 'Large file upload',
                    link: '/reference/forms/upload-big-file'
                }]
            }
        ],
        customCss: ['./src/styles/fonts.css', './src/styles/home.css', './src/styles/code-margin.css']
    })]
});
