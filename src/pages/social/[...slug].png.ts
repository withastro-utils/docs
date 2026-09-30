import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import sharp from 'sharp';
import brandMark from '../../assets/brand-mark.svg?raw';
import { socialDescriptions, socialIllustration } from '../../lib/social-cards';

export async function getStaticPaths() {
    return (await getCollection('docs')).map(page => ({ params: { slug: page.id || 'index' }, props: { id: page.id || 'index', title: page.id.startsWith('examples/') ? `Example: ${page.data.title}` : page.data.title, description: socialDescriptions[page.id || 'index'] ?? page.data.description } }));
}
const escape = (text: string) => text.replace(/[<>&"']/g, character => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[character]!);
async function wrap(text: string, size: number, bold: boolean, maxWidth: number): Promise<string[]> {
    if (text.includes('\n')) return (await Promise.all(text.split('\n').map(line => wrap(line, size, bold, maxWidth)))).flat();
    const lines: string[] = [];
    for (const word of text.split(/\s+/)) {
        const candidate = lines.length ? `${lines.at(-1)} ${word}` : word;
        const { width } = await sharp({ text: { text: escape(candidate), font: `sans-serif ${bold ? 'Bold ' : ''}${size}`, dpi: 72 } }).metadata();
        if (lines.length && width! <= maxWidth) lines[lines.length - 1] = candidate;
        else lines.push(word);
    }
    return lines;
}
export const GET: APIRoute = async ({ props }) => {
    const id = String(props.id);
    const category = id.startsWith('reference/') ? 'API REFERENCE' : id.startsWith('guides/') ? 'GUIDE' : id.startsWith('examples/') ? 'EXAMPLE' : id === 'examples' ? 'EXAMPLES' : id === '404' ? 'PAGE NOT FOUND' : 'DOCUMENTATION';
    const hasDiagram = props.id === 'reference/context';
    const textWidth = hasDiagram ? 575 : 1030;
    let titleSize = 78;
    let titleLines = await wrap(String(props.title), titleSize, true, textWidth);
    while (titleLines.length > 2 && titleSize > 48) titleLines = await wrap(String(props.title), titleSize -= 2, true, textWidth);
    const subtitle = await wrap(String(props.description), 44, false, hasDiagram ? 575 : 940);
    const titleStart = titleLines.length === 1 ? 270 : 222;
    const titleEnd = titleStart + (titleLines.length - 1) * (titleSize + 8);
    const subtitleStart = Math.max(368, titleEnd + 82);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
        <defs><radialGradient id="glow"><stop stop-color="#1273ae" stop-opacity=".38"/><stop offset="1" stop-color="#0b1523" stop-opacity="0"/></radialGradient><linearGradient id="panel" x2="1" y2="1"><stop stop-color="#192e43"/><stop offset="1" stop-color="#101f30"/></linearGradient><pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#82cfff" opacity=".10"/></pattern></defs>
        <rect width="1200" height="630" fill="#0b1523"/><ellipse cx="932" cy="300" rx="470" ry="400" fill="url(#glow)"/><rect x="650" width="550" height="630" fill="url(#grid)"/>
        <g transform="translate(64 49) scale(.75)">${brandMark.replace(/<svg[^>]*>/, tag => tag.replace(/\b(width|height)="[^"]*"/g, '$1="64"'))}</g>
        <g font-family="sans-serif"><text x="130" y="84" fill="#edf7ff" font-size="34" font-weight="700">Astro Utils</text>
        <text x="1136" y="82" text-anchor="end" fill="#82cfff" font-size="24" font-weight="600" letter-spacing="2">${category}</text>
        ${titleLines.map((line, i) => `<text x="64" y="${titleStart + i * (titleSize + 8)}" fill="#f0f7fc" font-size="${titleSize}" font-weight="700">${escape(line)}</text>`).join('')}
        ${subtitle.map((line, i) => `<text x="64" y="${subtitleStart + i * 54}" fill="#c3d8e7" font-size="44">${escape(line)}</text>`).join('')}
        ${socialIllustration(String(props.id))}
        <path d="M64 550H1136" stroke="#294052"/><text x="64" y="590" fill="#87a4b9" font-size="23">withastro-utils.github.io/docs</text></g></svg>`;
    return new Response(new Uint8Array(await sharp(Buffer.from(svg)).png().toBuffer()), { headers: { 'Content-Type': 'image/png' } });
};
