import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
	// Load Markdown files from `src/content/posts/`.
	loader: glob({
		base: './src/content/posts',
		pattern: '**/*.md',
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
			// Show only the first paragraph on the index page, with a "Weiterlesen" link.
			tldr: z.boolean().optional().default(false),
		}),
});

const pages = defineCollection({
	loader: glob({
		base: './src/content/pages',
		pattern: '**/*.md',
	}),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			heroImage: z.optional(image()),
		}),
});

export const collections = { posts, pages };
