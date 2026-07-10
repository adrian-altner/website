<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
	<xsl:template match="/rss/channel">
		<xsl:variable name="lang" select="substring(language, 1, 2)" />
		<html lang="{$lang}">
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
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						gap: 0.5em;
						font-size: 0.85em;
						color: var(--muted);
						margin: 0 0 1.5em;
					}
					.feed-url code {
						word-break: break-all;
					}
					.feed-url a {
						color: var(--accent);
					}
					.copy-btn {
						flex-shrink: 0;
						font: inherit;
						font-size: 0.85em;
						padding: 0.2em 0.7em;
						border: 1px solid var(--border);
						border-radius: 4px;
						background: var(--bg);
						color: var(--accent);
						cursor: pointer;
					}
					.copy-btn:hover {
						color: var(--accent-hover);
						border-color: var(--accent-hover);
					}
					.feed-note {
						color: var(--muted);
						font-size: 0.85em;
						margin: 0 0 1.5em;
					}
					.rss-help {
						color: var(--muted);
						font-size: 0.85em;
						margin: 0 0 1.5em;
					}
					.rss-help summary {
						cursor: pointer;
						color: var(--accent);
					}
					.rss-help summary:hover {
						color: var(--accent-hover);
					}
					.rss-help p {
						margin: 0.6em 0 0;
					}
					.rss-help a {
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
						<code id="feed-url"></code>
						<xsl:choose>
							<xsl:when test="$lang = 'en'">
								<button type="button" id="copy-feed-url" class="copy-btn" data-copied="Copied!">Copy</button>
							</xsl:when>
							<xsl:otherwise>
								<button type="button" id="copy-feed-url" class="copy-btn" data-copied="Kopiert!">Kopieren</button>
							</xsl:otherwise>
						</xsl:choose>
					</p>
					<xsl:choose>
						<xsl:when test="$lang = 'en'">
							<p class="feed-note">
								Subscribe with a feed reader to get new posts from
								<a href="{link}"><xsl:value-of select="link" /></a>.
							</p>
							<details class="rss-help">
								<summary>What is RSS?</summary>
								<p>
									RSS is an open standard that delivers new posts to you automatically,
									without giving up an email address or depending on an algorithm.
									A feed reader checks the feed regularly and shows you new entries.
								</p>
								<p>
									To get started: <a href="https://netnewswire.com/">NetNewsWire</a>,
									<a href="https://freshrss.org/">FreshRSS</a>, or
									<a href="https://feedly.com/">Feedly</a>.
								</p>
							</details>
						</xsl:when>
						<xsl:otherwise>
							<p class="feed-note">
								Mit einem Feedreader abonnieren, um neue Beiträge von
								<a href="{link}"><xsl:value-of select="link" /></a> zu erhalten.
							</p>
							<details class="rss-help">
								<summary>Was ist RSS?</summary>
								<p>
									RSS ist ein offener Standard, mit dem du neue Beiträge automatisch bekommst,
									ohne eine E-Mail-Adresse anzugeben oder von einem Algorithmus abhängig zu sein.
									Ein Feedreader prüft den Feed regelmäßig und zeigt dir neue Einträge an.
								</p>
								<p>
									Zum Einstieg: <a href="https://netnewswire.com/">NetNewsWire</a>,
									<a href="https://freshrss.org/">FreshRSS</a> oder
									<a href="https://feedly.com/">Feedly</a>.
								</p>
							</details>
						</xsl:otherwise>
					</xsl:choose>
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
				<script><![CDATA[
					var urlEl = document.getElementById('feed-url');
					var btn = document.getElementById('copy-feed-url');
					if (urlEl) urlEl.textContent = window.location.href;
					if (btn) {
						var originalLabel = btn.textContent;
						var resetTimer;
						btn.addEventListener('click', function () {
							var url = window.location.href;
							function done() {
								clearTimeout(resetTimer);
								btn.textContent = btn.getAttribute('data-copied');
								resetTimer = setTimeout(function () {
									btn.textContent = originalLabel;
								}, 1500);
							}
							function fallbackCopy() {
								var input = document.createElement('input');
								input.value = url;
								document.body.appendChild(input);
								input.select();
								document.execCommand('copy');
								document.body.removeChild(input);
								done();
							}
							if (navigator.clipboard && navigator.clipboard.writeText) {
								navigator.clipboard.writeText(url).then(done).catch(fallbackCopy);
							} else {
								fallbackCopy();
							}
						});
					}
				]]></script>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
