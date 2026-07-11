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
		'footer.imprint': 'Impressum',
		'footer.privacy': 'Datenschutz',
		'filters.filteringFor': 'Gefiltert nach:',
		'filters.reset': 'Alle Filter entfernen',
		'filters.showMoreTags': 'Mehr Tags',
		'filters.showFewerTags': 'Weniger Tags',
		'post.updated': 'aktualisiert',
		'index.description': 'Alle Beiträge',
		'index.empty': 'Noch keine Beiträge.',
	},
	en: {
		'nav.posts': 'Posts',
		'nav.about': 'About',
		'footer.subscribe': 'Subscribe',
		'footer.colophon': 'Colophon',
		'footer.imprint': 'Imprint',
		'footer.privacy': 'Privacy Policy',
		'filters.filteringFor': 'Filtering for:',
		'filters.reset': 'Remove all filters',
		'filters.showMoreTags': 'More tags',
		'filters.showFewerTags': 'Fewer tags',
		'post.updated': 'updated',
		'index.description': 'All posts',
		'index.empty': 'No posts yet.',
	},
} as const;
