import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { filenameFromPath } from '@/i18n/utils';

const posts = defineCollection({
	// Load Markdown and MDX files from `src/content/posts/de/` and `en/` —
	// the subdirectory structure (language, then year/month/day) is just
	// source-side organization (the `lang` field below is what the site
	// actually uses), so strip it back out of the generated id to keep post
	// URLs unchanged.
	loader: glob({
		base: './src/content/posts',
		pattern: '**/*.{md,mdx}',
		generateId: ({ entry }) => filenameFromPath(entry),
	}),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			tags: z.array(z.string()).optional(),
			// Draft posts only build/render in `astro dev`; excluded from production builds.
			draft: z.boolean().optional().default(false),
			lang: z.enum(['de', 'en']).optional().default('de'),
			// Path (relative to src/content/posts/) of this post's translation in
			// the other language, if one exists — e.g.
			// '/de/2026/07/11/hallo-welt.md'. Written as a full path rather than
			// just the bare id so it doubles as a way to actually find the
			// counterpart file; resolved back into a post id via
			// filenameFromPath() to build the language-switcher link.
			translationId: z.string().optional(),
		}),
});

export const collections = { posts };
