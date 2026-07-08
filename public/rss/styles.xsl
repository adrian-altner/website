<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
	<xsl:template match="/rss/channel">
		<html lang="de">
			<head>
				<title><xsl:value-of select="title" /> — RSS Feed</title>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<style>
					:root {
						--accent: #3a5c28;
						--accent-hover: #2a4419;
						--bg: #e5e5e0;
						--text: #2a2a2a;
						--muted: #666660;
						--border: #c8c8c2;
					}
					* { box-sizing: border-box; }
					body {
						font-family: ui-monospace, "IBM Plex Mono", monospace;
						margin: 0;
						padding: 0;
						background-color: var(--bg);
						color: var(--text);
						font-size: 15px;
						line-height: 1.7;
					}
					main {
						width: 600px;
						max-width: calc(100% - 2em);
						margin: 0 auto;
						padding: 2em 1em 4em;
					}
					h1 {
						font-size: 1.4em;
						margin: 0 0 0.2em;
					}
					.lede {
						color: var(--muted);
						font-size: 0.9em;
						margin: 0 0 0.5em;
					}
					.feed-url {
						font-size: 0.85em;
						color: var(--muted);
						word-break: break-all;
						margin: 0 0 1.5em;
					}
					.feed-url a {
						color: var(--accent);
					}
					hr {
						border: none;
						border-top: 1px solid var(--border);
						margin: 1.5em 0;
					}
					ul {
						list-style: none;
						padding: 0;
						margin: 0;
					}
					li {
						padding: 0.8em 0;
						border-top: 1px solid var(--border);
					}
					li:first-child {
						border-top: none;
					}
					.item-title {
						font-weight: bold;
						text-decoration: underline;
						color: var(--accent);
					}
					.item-title:hover {
						color: var(--accent-hover);
					}
					.item-date {
						color: var(--muted);
						font-size: 0.85em;
						display: block;
						margin-top: 0.2em;
					}
					.item-desc {
						margin: 0.4em 0 0;
						color: var(--text);
					}
				</style>
			</head>
			<body>
				<main>
					<h1><xsl:value-of select="title" /></h1>
					<p class="lede"><xsl:value-of select="description" /></p>
					<p class="feed-url">
						Dies ist der RSS-Feed von <a href="{link}"><xsl:value-of select="link" /></a> —
						mit einem Feedreader abonnieren.
					</p>
					<hr />
					<ul>
						<xsl:for-each select="item">
							<li>
								<a class="item-title" href="{link}"><xsl:value-of select="title" /></a>
								<span class="item-date"><xsl:value-of select="pubDate" /></span>
								<p class="item-desc"><xsl:value-of select="description" /></p>
							</li>
						</xsl:for-each>
					</ul>
				</main>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
