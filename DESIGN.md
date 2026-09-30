# Astro Utils: Sky

The user selected **Sky — softer** on 12 September 2026. This supersedes the prior teal/orange Request Flight Control direction. Research: [blue design rethink](plans/blue-design-rethink.md). The historical palette study remains in `plans/blue-direction-preview.html`; `design-preview.html` opens on Sky.

## Identity and purpose

A friendly, precise documentation site for server-first Astro utilities. The signature object is a form beside its source, linked by a short request sequence. The homepage introduces the workflow; documentation keeps familiar navigation and quiet reading surfaces.

Use the rocket and mechanical support arm in sky blue. Frame the main demonstration with quiet themed surfaces. A slow sky glow is confined to the homepage hero; keep article text on flat surfaces.

## Shared system

`src/styles/home.css` defines the semantic CSS tokens. `design-tokens.json` records the palette and core dimensions. Components use `--au-accent` for links/location and `--au-action` for filled buttons. Do not reintroduce literal teal/orange tokens.

| Role | Light | Dark |
| --- | --- | --- |
| Canvas | #F8FBFD | #0B1523 |
| Navigation | #FFFFFF | #0B1523 |
| Raised surface | #FFFFFF | #111E30 |
| Soft surface | #EDF5FA | #15273B |
| Strong text | #152B3D | #F0F7FC |
| Body text | #496175 | #B4C8D8 |
| Muted text | #526C80 | #99B1C4 |
| Divider | #D9E5ED | #293E53 |
| Control boundary | #788DA0 | #70879E |
| Link / selection | #0B6EAD | #82CFFF |
| Filled action | #0B6EAD | #0B6EAD |

Filled actions have white text in both themes. Selected navigation combines tinted background, readable accent text, a side marker, and current-page semantics. Errors and warnings keep semantic Starlight colors and visible labels.

Manrope Variable supplies headings, body, and navigation. IBM Plex Mono supplies source and compact annotations. Use 16px body text with 1.8 leading, a 46rem reading column, a 17rem sidebar, and a 4.25rem desktop header. Mobile inputs use at least 16px type. Headings use moderate 700 weight; display size is fluid rather than viewport-filling.

Spacing follows a 4px scale. Controls/buttons have 6px corners, panels 10px, hero frame 12px. Use lines and alignment for related links; reserve enclosed panels for source, previews, and discrete tools. Dark elevation relies on borders and surface changes; light elevation uses faint shadows.

## Behavior

- Header links normalize `/docs/` before appending routes. Starlight owns the responsive menu, sidebar, theme control, and search dialog. The custom search wrapper adds useful destinations and explicit focus restoration.
- Documentation uses breadcrumbs, clear titles, section anchors, inline-code surfaces, local table scrolling, and restrained previous/next links.
- Examples use Starlight file tabs, default to source at every width, and lazy-load the optional Preview tab. Preserve the simulated-preview disclosure.
- The homepage demo uses browser constraints and local feedback. It does not create accounts or imply a real server benchmark.
- Copy controls report success or failure without moving focus.
- Keep the homepage focused: useful source, example links, and utility navigation. No calculator or decorative statistics.
- Hover/disclosure feedback uses 140–200ms transitions. Essential content is rendered immediately. Reduced-motion removes nonessential transitions/animation.

## SEO and assets

Preserve page slugs, generated canonical metadata, and crawlable navigation. Social PNGs are generated from documentation titles at build time at 1200 × 630, with a shared sky identity. Preview routes remain noindex and excluded from the sitemap; generated social routes are excluded too. `Head.astro` replaces fallback social tags while retaining Starlight's other metadata. The SVG favicon is primary; the raster fallback is generated from the same mark.

The site is hosted beneath `/docs/`. Origin-root robots.txt management and production field performance are deployment concerns, not established by a local build.

## Validation

Run `npm run build`. Check the built site with Pagefind enabled, both themes, narrow/mobile widths, menus, keyboard search, source tabs, mock submission, canonical/image paths, and local-link resolution. Report actual checks and limitations; do not claim full WCAG certification or field Core Web Vitals from these checks.

The brand mark is a rocket supported by an articulated mechanical arm. Example links pair task-specific generated clay illustrations with descriptive text. A shared four-manager installation component provides npm, pnpm, Yarn, and Bun without nested frames. Expressive Code theme surfaces live in `ec.config.mjs`; builds force content regeneration to avoid stale Markdown stylesheet hashes.
