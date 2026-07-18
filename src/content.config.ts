import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
	// Load Markdown and MDX files from `src/content/posts/`.
	loader: glob({
		base: './src/content/posts',
		pattern: '**/*.{md,mdx}',
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

export const collections = { posts };
