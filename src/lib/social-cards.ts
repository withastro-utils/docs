// Short share-card copy complements the longer search descriptions.
export const socialDescriptions: Record<string, string> = {
    index: 'Bind fields. Run server actions. Build with Astro.',
    examples: 'Working examples. Real source. Ready to explore.',
    '404': 'Find your next guide, example, or API reference.',
    'reference/context': 'Share server state\nacross components.',
    'guides/context': 'Pass values from layouts to nested components.',
    'guides/express-endpoints': 'Build your first endpoint with familiar server tools.',
    'reference/express/request': 'Read request data and negotiate content.',
    'reference/express/response': 'Send JSON, files, redirects, and streams.',
    'reference/express/router-and-errors': 'Compose middleware. Handle failures clearly.',
    'guides/forms/getting-started': 'Your first form and server action, step by step.',
    'guides/forms/data-binding': 'Bind your inputs. Validate on the server.',
    'guides/forms/loops-and-components': 'Keep repeated forms connected to the right item.',
    'guides/forms/js-helpers': 'Redirect, refresh, and respond from your server.',
    'reference/forms': 'The right imports for every part of your form.',
    'reference/forms/index': 'The right imports for every part of your form.',
    'reference/forms/basic-form-components': 'Inputs, buttons, and feedback that work together.',
    'reference/forms/data-binding': 'Control form values, validation, and state.',
    'reference/forms/events-and-triggers': 'Connect browser events to form actions.',
    'reference/forms/session': 'Keep small values across page requests.',
    'reference/forms/configuration': 'Configure sessions, uploads, and middleware.',
    'reference/forms/advanced-responses': 'Return the response your workflow needs.',
    'reference/forms/upload-big-file': 'Transfer files in chunks. Track their progress.',
    'examples/signup': 'Validate account fields before running an action.',
    'examples/login': 'Show clear feedback for success and failure.',
    'examples/todo': 'Add and remove tasks with server-backed state.',
    'examples/settings': 'Edit preferences. Validate and save changes.',
    'examples/upload': 'Upload large files with progress and feedback.',
    'examples/government-form': 'Save a draft. Validate before submission.',
    'examples/products': 'Filter a catalog and render matching products.'
};

export function socialIllustration(id: string) {
    if (id === 'reference/context') return `<g transform="translate(166 48) scale(.82)">
        <path d="M905 292V325Q905 349 881 349H768Q744 349 744 373V405M905 325Q905 349 929 349H1046Q1070 349 1070 373V405" fill="none" stroke="#82cfff" stroke-width="4"/>
        <circle cx="905" cy="328" r="7" fill="#c0e9ff"/>
        <rect x="754" y="171" width="302" height="121" rx="20" fill="url(#panel)" stroke="#527993" stroke-width="2"/>
        <rect x="650" y="405" width="188" height="100" rx="16" fill="#14283b" stroke="#3b6580" stroke-width="2"/>
        <rect x="976" y="405" width="188" height="100" rx="16" fill="#14283b" stroke="#3b6580" stroke-width="2"/>
        <rect x="795" y="215" width="33" height="33" rx="5" fill="none" stroke="#82cfff" stroke-width="2.5"/>
        <path d="M795 226H828M807 226V248" stroke="#82cfff" stroke-width="2.5"/>
        <text x="849" y="245" font-size="31" fill="#edf7ff">Layout</text>
        <text x="744" y="469" text-anchor="middle" font-size="28" fill="#edf7ff">Header</text>
        <text x="1070" y="469" text-anchor="middle" font-size="28" fill="#edf7ff">Menu</text></g>`;
    return '';
}
