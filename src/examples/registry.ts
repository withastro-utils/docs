import productsCode from './products/products.astro.txt?raw';
import catalogCode from './products/products.ts.txt?raw';
import layoutCode from './shared/Layout.astro.txt?raw';
import middlewareCode from './shared/middleware.ts.txt?raw';
import configCode from './signup/astro.config.mjs.txt?raw';
import applicationCode from './government-form/application.astro.txt?raw';
import loginCode from './login/login.astro.txt?raw';
import settingsCode from './settings/settings.astro.txt?raw';
import signupCode from './signup/signup.astro.txt?raw';
import todoCode from './todo/todo.astro.txt?raw';
import uploadCode from './upload/upload.astro.txt?raw';
import type { Example } from './schema';

export const signupExample = {
    id: 'signup',
    title: 'Create an account',
    description: 'Bind account fields, validate them, and run a server action after a valid submission.',
    packages: ['forms'],
    topics: ['binding', 'validation', 'actions'],
    difficulty: 'beginner',
    files: [
        { label: 'src/layouts/Layout.astro', code: layoutCode, lang: 'astro' },
        { label: 'src/pages/signup.astro', code: signupCode, lang: 'astro' },
        { label: 'src/middleware.ts', code: middlewareCode, lang: 'ts' },
        { label: 'astro.config.mjs', code: configCode, lang: 'js' },
    ],
    previewUrl: '/docs/previews/signup/',
    previewStatus: 'static',
    guideUrl: '/docs/examples/signup/'
} satisfies Example;

export const loginExample = {
    id: 'login',
    title: 'Log in with feedback',
    description: 'Try success and error feedback with a clearly labeled demo session.',
    packages: ['forms'],
    topics: ['authentication', 'validation', 'sessions'],
    difficulty: 'beginner',
    files: [
        { label: 'src/layouts/Layout.astro', code: layoutCode, lang: 'astro' },
        { label: 'src/pages/login.astro', code: loginCode, lang: 'astro' },
        { label: 'src/middleware.ts', code: middlewareCode, lang: 'ts' },
        { label: 'astro.config.mjs', code: configCode, lang: 'js' },
    ],
    previewUrl: '/docs/previews/login/',
    previewStatus: 'static',
    guideUrl: '/docs/examples/login'
} satisfies Example;

export const todoExample = {
    id: 'todo',
    title: 'Manage a task list',
    description: 'Add and remove persisted items while the form automatically renders the latest server state.',
    packages: ['forms'],
    topics: ['actions', 'lists', 'state'],
    difficulty: 'intermediate',
    files: [
        { label: 'src/layouts/Layout.astro', code: layoutCode, lang: 'astro' },
        { label: 'src/pages/todo.astro', code: todoCode, lang: 'astro' },
        { label: 'src/middleware.ts', code: middlewareCode, lang: 'ts' },
        { label: 'astro.config.mjs', code: configCode, lang: 'js' },
    ],
    previewUrl: '/docs/previews/todo/',
    previewStatus: 'static',
    guideUrl: '/docs/examples/todo'
} satisfies Example;

export const settingsExample = {
    id: 'settings',
    title: 'Edit profile settings',
    description: 'Combine text, select, and textarea controls in one saved preferences form.',
    packages: ['forms'],
    topics: ['binding', 'components', 'validation'],
    difficulty: 'beginner',
    files: [
        { label: 'src/layouts/Layout.astro', code: layoutCode, lang: 'astro' },
        { label: 'src/pages/settings.astro', code: settingsCode, lang: 'astro' },
        { label: 'src/middleware.ts', code: middlewareCode, lang: 'ts' },
        { label: 'astro.config.mjs', code: configCode, lang: 'js' },
    ],
    previewUrl: '/docs/previews/settings/',
    previewStatus: 'static',
    guideUrl: '/docs/examples/settings'
} satisfies Example;

export const uploadExample = {
    id: 'upload',
    title: 'Upload a large file',
    description: 'Upload a file in bounded chunks and show progress before processing it on the server.',
    packages: ['forms'],
    topics: ['files', 'progress', 'validation'],
    difficulty: 'intermediate',
    files: [
        { label: 'src/layouts/Layout.astro', code: layoutCode, lang: 'astro' },
        { label: 'src/pages/upload.astro', code: uploadCode, lang: 'astro' },
        { label: 'src/middleware.ts', code: middlewareCode, lang: 'ts' },
        { label: 'astro.config.mjs', code: configCode, lang: 'js' },
    ],
    previewUrl: '/docs/previews/upload/',
    previewStatus: 'static',
    guideUrl: '/docs/examples/upload'
} satisfies Example;

export const governmentFormExample = {
    id: 'government-form',
    title: 'Submit a service request',
    description: 'Group an application into sections and save a small draft in the session.',
    packages: ['forms'],
    topics: ['accessibility', 'state', 'validation'],
    difficulty: 'advanced',
    files: [
        { label: 'src/layouts/Layout.astro', code: layoutCode, lang: 'astro' },
        { label: 'src/pages/application.astro', code: applicationCode, lang: 'astro' },
        { label: 'src/middleware.ts', code: middlewareCode, lang: 'ts' },
        { label: 'astro.config.mjs', code: configCode, lang: 'js' },
    ],
    previewUrl: '/docs/previews/government-form/',
    previewStatus: 'static',
    guideUrl: '/docs/examples/government-form'
} satisfies Example;

export const examples = [signupExample, loginExample, todoExample, settingsExample, uploadExample, governmentFormExample];

export const productsExample = {
    id: 'products', title: 'Filter a product catalog',
    description: 'Bind a price filter, run server logic, and render matching products.',
    packages: ['forms'], topics: ['binding', 'actions', 'validation'], difficulty: 'beginner',
    files: [
        { label: 'src/layouts/Layout.astro', code: layoutCode, lang: 'astro' },
        { label: 'src/pages/products.astro', code: productsCode, lang: 'astro' },
        { label: 'src/middleware.ts', code: middlewareCode, lang: 'ts' },
        { label: 'astro.config.mjs', code: configCode, lang: 'js' },
        { label: 'src/data/products.ts', code: catalogCode, lang: 'ts' },
    ],
    previewUrl: '/docs/previews/products/', previewStatus: 'static', guideUrl: '/docs/examples/products/'
} satisfies Example;
