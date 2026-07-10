import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
	// Load Markdown and MDX files in the `src/content/posts/` directory.
	loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
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
		}),
});

const pages = defineCollection({
	// Standalone content pages that aren't blog posts (e.g. the colophon) —
	// no pubDate/tags, so they never show up in the blog listing, tag/year
	// pages, RSS feed, or Pagefind search.
	loader: glob({ base: './src/content/pages', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		lang: z.enum(['de', 'en']).optional().default('de'),
	}),
});

export const collections = { posts, pages };
