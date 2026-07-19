import { visit } from 'unist-util-visit';

// Turns `![alt](src "frame")` into a `.media-frame`-wrapped image — the
// markdown image title doubles as an opt-in switch instead of having to
// hand-write a `<div class="media-frame">` block around every photo.
export function remarkMediaFrame() {
	return (tree) => {
		visit(tree, 'paragraph', (node) => {
			const [image] = node.children;
			if (node.children.length === 1 && image.type === 'image' && image.title === 'frame') {
				image.title = null;
				node.data = { hName: 'div', hProperties: { class: 'media-frame' } };
			}
		});
	};
}
