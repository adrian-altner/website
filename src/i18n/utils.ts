import { getRelativeLocaleUrl } from 'astro:i18n';
import { defaultLang, postSegment, ui } from './ui';

type Lang = keyof typeof ui;

export function useTranslations(lang: string | undefined) {
	const resolved: Lang = lang && lang in ui ? (lang as Lang) : defaultLang;
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return ui[resolved][key];
	};
}

export function postUrl(lang: string | undefined, id: string) {
	const resolved: Lang = lang && lang in ui ? (lang as Lang) : defaultLang;
	return getRelativeLocaleUrl(resolved, `/${postSegment[resolved]}/${id}/`);
}

export function tagUrl(lang: string | undefined, tag: string) {
	const resolved: Lang = lang && lang in ui ? (lang as Lang) : defaultLang;
	return getRelativeLocaleUrl(resolved, `/tag/${tag}/`);
}
