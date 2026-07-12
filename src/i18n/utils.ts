import { getRelativeLocaleUrl } from 'astro:i18n';
import { defaultLang, postSegment, ui } from '@/i18n/ui';

type Lang = keyof typeof ui;

export function useTranslations(lang: string | undefined) {
	const resolved: Lang = lang && lang in ui ? (lang as Lang) : defaultLang;
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return ui[resolved][key];
	};
}

// Extracts the filename (without extension) from a content-relative path,
// e.g. '/de/2026/07/11/hallo-welt.md' → 'hallo-welt'. Content collection ids
// are always just this bare filename regardless of directory depth (see
// generateId in content.config.ts) — this is also how a translationId path
// gets resolved back into an actual post id for URL building.
export function filenameFromPath(path: string) {
	return path.split('/').pop()!.replace(/\.(md|mdx)$/, '');
}

export function postUrl(lang: string | undefined, id: string) {
	const resolved: Lang = lang && lang in ui ? (lang as Lang) : defaultLang;
	return getRelativeLocaleUrl(resolved, `/${postSegment[resolved]}/${id}/`);
}

// Tags have no dedicated page — this links to the post index with the tag
// pre-selected, which PostFilters.astro's script applies on load.
export function tagUrl(lang: string | undefined, tag: string) {
	const resolved: Lang = lang && lang in ui ? (lang as Lang) : defaultLang;
	return `${getRelativeLocaleUrl(resolved, '/')}?tag=${encodeURIComponent(tag)}`;
}

const dateLocale = { de: 'de-DE', en: 'en-US' } as const;

// Formats a date for display — either a locale-aware "Jun 19, 2024" style
// string, or a fixed ISO "2024-06-19" (`iso: true`, used for the compact
// tabular-nums date column in PostList.astro). Callers wrap the result in
// their own <time datetime={date.toISOString()}> for the semantic markup.
export function formatDate(date: Date, lang: string | undefined, options?: { iso?: boolean }) {
	const resolved: Lang = lang && lang in ui ? (lang as Lang) : defaultLang;
	if (options?.iso) {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}
	return date.toLocaleDateString(dateLocale[resolved], {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
}
