// Formats a date for display — either a locale-aware "19. Jun. 2024" style
// string, or a fixed ISO "2024-06-19" (`iso: true`, used for the compact
// tabular-nums date column in the post index). Callers wrap the result in
// their own <time datetime={date.toISOString()}> for the semantic markup.
export function formatDate(date: Date, options?: { iso?: boolean }) {
	if (options?.iso) {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}
	return date.toLocaleDateString('de-DE', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
}

export function postUrl(id: string) {
	return `/beitrag/${id}/`;
}
