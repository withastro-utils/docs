import { documents, markdownResponse } from '../lib/agent-docs';
export async function getStaticPaths() {
    return (await documents()).map(doc => ({ params: { document: doc.path.slice('/docs/'.length, -3) }, props: { text: doc.text } }));
}
export function GET({ props }: { props: { text: string } }) { return markdownResponse(props.text); }
