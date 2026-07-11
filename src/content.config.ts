import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
	// Load Markdown and MDX files from `src/content/posts/de/` and `en/` —
	// the subdirectory is just source-side organization by language (the
	// `lang` field below is what the site actually uses), so strip it back
	// out of the generated id to keep post URLs unchanged.
	loader: glob({
		base: './src/content/posts',
		pattern: '**/*.{md,mdx}',
		generateId: ({ entry }) =>
			entry
				.split('/')
				.pop()
				.replace(/\.(md|mdx)$/, ''),
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
			// id (filename without extension) of this post's translation in the
			// other language, if one exists — lets the language switcher deep-link
			// to the counterpart post instead of falling back to the homepage.
			translationId: z.string().optional(),
		}),
});

export const collections = { posts };
