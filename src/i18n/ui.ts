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
		'filters.filteringFor': 'Gefiltert nach',
		'filters.year': 'Jahr:',
		'filters.tag': 'Tag:',
		'filters.and': 'und',
		'filters.reset': 'Alle Filter entfernen',
		'filters.showMoreTags': 'Mehr Tags',
		'filters.showFewerTags': 'Weniger Tags',
		'post.updated': 'aktualisiert',
		'post.alsoAvailable': 'Diesen Beitrag gibt es auch auf',
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
		'filters.filteringFor': 'Filtering for',
		'filters.year': 'Year:',
		'filters.tag': 'Tag:',
		'filters.and': 'and',
		'filters.reset': 'Remove all filters',
		'filters.showMoreTags': 'More tags',
		'filters.showFewerTags': 'Fewer tags',
		'post.updated': 'updated',
		'post.alsoAvailable': 'This post is also available in',
		'index.description': 'All posts',
		'index.empty': 'No posts yet.',
	},
} as const;
