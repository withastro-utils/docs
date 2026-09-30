import { documents, agentGuide } from '../lib/agent-docs';
export async function GET() {
    const docs = await documents();
    return new Response(`# Astro Utils — complete documentation\n\nGenerated from the same source as the website. Begin with /docs/llms.txt for focused retrieval.\n\n${agentGuide()}\n\n${docs.map(doc => `---\n\n${doc.text}`).join('\n')}`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
