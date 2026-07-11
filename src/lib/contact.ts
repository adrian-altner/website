// Simple scraper deterrent for contact details rendered on the Impressum and
// Datenschutzerklärung pages: the text is reversed in the DOM and flipped
// back to reading order with the `.r` CSS class (unicode-bidi + rtl). Naive
// scrapers that read raw text content see reversed strings; browsers render
// it correctly for humans.
export function reverseText(text: string): string {
	return [...text].reverse().join('');
}

export function encodeEmail(email: string): string {
	return reverseText(email);
}
