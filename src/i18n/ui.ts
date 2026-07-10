export const languages = {
	de: 'Deutsch',
	en: 'English',
} as const;

export const defaultLang = 'de';

// The post-detail path segment differs per locale (German slugs elsewhere on
// the site use "beitrag"; an English URL keeps the English word instead).
export const postSegment = {
	de: 'beitrag',
	en: 'post',
} as const;

export const ui = {
	de: {
		'nav.posts': 'Beiträge',
		'nav.about': 'Über mich',
		'footer.subscribe': 'Abonnieren',
		'footer.colophon': 'Kolophon',
		'search.label': 'Suche',
		'search.placeholder': 'Suchen…',
		'search.clear': 'Suche leeren',
		'search.suggestions': 'Meintest du:',
		'search.searching': 'Suche…',
		'search.noResults': 'Keine Ergebnisse.',
		'search.resultOne': '1 Treffer',
		'search.resultsTemplate': '{n} Treffer',
		'search.devOnly':
			'Suche erfordert einen Production-Build (npm run build) — im Dev-Server nicht verfügbar.',
		'post.updated': 'aktualisiert',
		'index.description': 'Alle Beiträge',
		'index.empty': 'Noch keine Beiträge.',
		'tag.descriptionPrefix': 'Alle Beiträge mit Tag',
	},
	en: {
		'nav.posts': 'Posts',
		'nav.about': 'About',
		'footer.subscribe': 'Subscribe',
		'footer.colophon': 'Colophon',
		'search.label': 'Search',
		'search.placeholder': 'Search…',
		'search.clear': 'Clear search',
		'search.suggestions': 'Did you mean:',
		'search.searching': 'Searching…',
		'search.noResults': 'No results.',
		'search.resultOne': '1 result',
		'search.resultsTemplate': '{n} results',
		'search.devOnly':
			'Search requires a production build (npm run build) — unavailable in the dev server.',
		'post.updated': 'updated',
		'index.description': 'All posts',
		'index.empty': 'No posts yet.',
		'tag.descriptionPrefix': 'All posts tagged',
	},
} as const;
