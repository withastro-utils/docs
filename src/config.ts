export const SITE = {
	title: 'AM Docs',
	description: 'Documentation website of Astro-Metro',
	defaultLanguage: 'en_US',
	basePath: '/docs'
};

export const OPEN_GRAPH = {
	image: {
		src: 'https://github.com/astro-metro/docs/blob/main/public/banner.jpeg?raw=true',
		alt:
			'astro logo on a starry expanse of space,' +
			' with a purple saturn-like planet floating in the right foreground',
	},
	twitter: 'astrodotbuild',
};

// This is the type of the frontmatter you put in the docs markdown files.
export type Frontmatter = {
	title: string;
	description: string;
	layout: string;
	image?: { src: string; alt: string };
	dir?: 'ltr' | 'rtl';
	ogLocale?: string;
	lang?: string;
};

export const KNOWN_LANGUAGES = {
	English: 'en',
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

export const GITHUB_EDIT_URL = `https://github.com/astro-metro/docs/tree/main`;

export const COMMUNITY_INVITE_URL = `https://github.com/astro-metro/docs/discussions`;

// See "Algolia" section of the README for more information.
export const ALGOLIA = {
	indexName: 'XXXXXXXXXX',
	appId: 'XXXXXXXXXX',
	apiKey: 'XXXXXXXXXX',
};

export type Sidebar = Record<
	typeof KNOWN_LANGUAGE_CODES[number],
	Record<string, { text: string; link: string }[]>
>;
export const SIDEBAR: Sidebar = {
	en: {
		'About': [
			{ text: 'Introduction', link: 'en/introduction' },
		],
		'Forms': [
			{ text: 'Getting Started', link: 'en/forms/getting-started' },
			{ text: 'Data binding', link: 'en/forms/data-binding' },
			{ text: 'Components', link: 'en/forms/components' },
			{ text: 'Session', link: 'en/forms/session' }
		],
		'Formidable': [
			{ text: 'Getting Started', link: 'en/formidable' },
		],
		'Context': [
			{ text: 'Getting Started', link: 'en/context' },
		]
	},
};
