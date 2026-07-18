// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://achis.blog',
	integrations: [mdx(), sitemap()],
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Inter',
			cssVariable: '--font-sans',
			// Never swap fonts mid-render (e.g. right after a full-page navigation) —
			// avoids the visible layout jump when the webfont finishes loading.
			display: 'optional',
			options: {
				variants: [
					{ weight: '100 900', style: 'normal', src: ['./src/assets/fonts/InterVariable.woff2'] },
					{
						weight: '100 900',
						style: 'italic',
						src: ['./src/assets/fonts/InterVariable-Italic.woff2'],
					},
				],
			},
		},
		{
			provider: fontProviders.local(),
			name: 'Bricolage Grotesque',
			cssVariable: '--font-heading',
			display: 'optional',
			options: {
				variants: [
					{
						weight: '200 800',
						style: 'normal',
						src: ['./src/assets/fonts/BricolageGrotesque-VF.woff2'],
					},
				],
			},
		},
		{
			provider: fontProviders.local(),
			name: 'Maple Mono',
			cssVariable: '--font-mono',
			display: 'optional',
			options: {
				variants: [
					{
						weight: '100 800',
						style: 'normal',
						src: ['./src/assets/fonts/MapleMono[wght]-VF.woff2'],
					},
					{
						weight: '100 800',
						style: 'italic',
						src: ['./src/assets/fonts/MapleMono-Italic[wght]-VF.woff2'],
					},
				],
			},
		},
	],
});
