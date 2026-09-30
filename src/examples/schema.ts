export type ExampleFile = {
    label: string;
    code: string;
    lang: 'astro' | 'css' | 'html' | 'js' | 'ts';
};

export type Example = {
    id: string;
    title: string;
    description: string;
    packages: ('forms' | 'context' | 'express-endpoints')[];
    topics: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    files: ExampleFile[];
    previewUrl: string;
    previewStatus: 'static' | 'live';
    guideUrl: string;
};