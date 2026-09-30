import { getCollection } from 'astro:content';
import * as registry from '../examples/registry';
import * as guides from '../examples/guide';
import type { Example } from '../examples/schema';
import guidance from '../content/agent-guidance/getting-started.md?raw';
import search from '../examples/guide/search.astro.txt?raw';

export const base = '/docs/';
export const origin = 'https://withastro-utils.github.io';
export const markdownPath = (id: string) => `${base}${id && id !== 'index' ? `${id.replace(/\/index$/, '')}/` : ''}index.md`;
const exampleMap = { ...registry, ...guides } as Record<string, unknown>;
export function exampleMarkdown(example: Example) {
    return example.files.map(file => `### ${file.label}\n\n\`\`\`${file.lang} title="${file.label}"\n${file.code.trim()}\n\`\`\``).join('\n\n');
}
const exampleList = [...registry.examples, registry.productsExample].map(example => `- [${example.title}](${markdownPath(example.guideUrl.replace(base, '').replace(/\/$/, ''))}): ${example.description}`).join('\n');

// Transform only prose segments: imports and JSX inside code fences must remain untouched.
export function cleanMarkdown(body: string) {
    return body.split(/(^[ \t]*```[^\n]*\n[\s\S]*?^[ \t]*```[ \t]*$)/gm).map((part, index) => {
        if (index % 2) return part;
        return part.replace(/^import .+;\s*$/gm, '')
            .replace(/<CodePreview\s+example=\{(\w+)\}\s*\/>/g, (_all, name) => {
                const example = exampleMap[name] as Example | undefined;
                if (!example?.files) throw new Error(`Unexported example: ${name}`);
                return exampleMarkdown(example);
            })
            .replace(/<InstallTabs packages="([^"]+)"\s*\/>/g, (_all, packages) => ['npm install', 'pnpm add', 'yarn add', 'bun add'].map(command => `\`\`\`sh title="Terminal"\n${command} ${packages}\n\`\`\``).join('\n\n'))
            .replace(/<Aside[^>]*title="([^"]+)"[^>]*>/g, '**$1**\n\n').replace(/<\/Aside>/g, '')
            .replace(/<ExampleList\s*\/>/g, exampleList)
            .replace(/<LandingSections\s*\/>/g, `Astro Utils provides server-first forms, request context, and Express-style endpoints.\n\n[Start building](${base}agents/getting-started.md)\n\n${exampleList}`)
            .replace(/\]\((\/docs\/[^)#]*)(#[^)]*)?\)/g, (_all, path, fragment = '') => {
                if (/\.[a-z]+$/i.test(path)) return `](${origin}${path}${fragment})`;
                return `](${origin}${markdownPath(path.slice(base.length).replace(/\/$/, ''))}${fragment})`;
            });
    }).join('').replace(/\n{3,}/g, '\n\n').trim();
}
export async function documents() {
    const entries = await getCollection('docs');
    return entries.filter(entry => entry.id !== '404' && !entry.data.draft).map(entry => ({
        id: entry.id, title: entry.data.title, description: entry.data.description ?? '', path: markdownPath(entry.id),
        text: `# ${entry.data.title}\n\n${entry.data.description ?? ''}\n\nSource: ${origin}${base}${entry.id === 'index' ? '' : `${entry.id.replace(/\/index$/, '')}/`}\n\n${cleanMarkdown(entry.body ?? '')}\n`
    })).sort((a, b) => a.path.localeCompare(b.path));
}
export function agentGuide() {
    return guidance.replace('<!-- SETUP -->', exampleMarkdown({ ...registry.productsExample, files: registry.productsExample.files.filter(file => /Layout|middleware|config/.test(file.label)) }))
        .replace('<!-- PRODUCTS -->', exampleMarkdown({ ...registry.productsExample, files: registry.productsExample.files.filter(file => /pages\/|data\//.test(file.label)) }))
        .replace('<!-- SEARCH -->', `\`\`\`astro title="src/pages/search.astro"\n${search.trim()}\n\`\`\``);
}
export function markdownResponse(text: string) {
    return new Response(text, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
