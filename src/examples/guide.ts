import type { Example } from './schema';
import submitActionExampleCode from './guide/submit-action.astro.txt?raw';
import bindingExampleCode from './guide/binding.astro.txt?raw';
import counterExampleCode from './guide/counter.astro.txt?raw';
import colorsExampleCode from './guide/colors.astro.txt?raw';

export const submitActionExample = { id: 'submit-action', title: 'Submit a server action', description: 'Submit a server action', packages: ['forms'], topics: ['binding'], difficulty: 'beginner', files: [{ label: 'src/pages/hello.astro', code: submitActionExampleCode, lang: 'astro' }], previewUrl: '/docs/previews/submit-action/', previewStatus: 'static', guideUrl: '/docs/guides/forms/getting-started/' } satisfies Example;

export const bindingExample = { id: 'binding', title: 'Bind a profile', description: 'Bind a profile', packages: ['forms'], topics: ['binding'], difficulty: 'beginner', files: [{ label: 'src/pages/profile.astro', code: bindingExampleCode, lang: 'astro' }], previewUrl: '/docs/previews/binding/', previewStatus: 'static', guideUrl: '/docs/guides/forms/data-binding/' } satisfies Example;

export const counterExample = { id: 'counter', title: 'Preserve a counter', description: 'Preserve a counter', packages: ['forms'], topics: ['binding'], difficulty: 'beginner', files: [{ label: 'src/pages/counter.astro', code: counterExampleCode, lang: 'astro' }], previewUrl: '/docs/previews/counter/', previewStatus: 'static', guideUrl: '/docs/guides/forms/data-binding/' } satisfies Example;

export const colorsExample = { id: 'colors', title: 'Change button state', description: 'Change button state', packages: ['forms'], topics: ['binding'], difficulty: 'beginner', files: [{ label: 'src/pages/button-colors.astro', code: colorsExampleCode, lang: 'astro' }], previewUrl: '/docs/previews/colors/', previewStatus: 'static', guideUrl: '/docs/guides/forms/data-binding/' } satisfies Example;
