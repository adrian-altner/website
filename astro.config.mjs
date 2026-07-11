// @ts-check

import node from '@astrojs/node';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://achis.blog',
	adapter: node({ mode: 'standalone' }),
	integrations: [mdx(), sitemap()],
	i18n: {
		locales: ['de', 'en'],
		defaultLocale: 'de',
		routing: {
			prefixDefaultLocale: false,
		},
	},
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Inter',
			cssVariable: '--font-sans',
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
