---
title: 'Tichuca Rooftop Bar'
description: 'Ein Foto von der Tichuca Rooftop Bar in Bangkok, Thailand.'
pubDate: '2025-10-23'
tags: ['bangkok', 'foto']
---

import { Image } from 'astro:assets';
import MediaFrame from '@/components/MediaFrame.astro';
import foto from './2025-10-23-211456.jpg';
import video from './2025-10-23-212131.mp4';
import poster from './2025-10-23-212131-poster.jpg';

<MediaFrame>
	<Image src={foto} alt="Tichuca Rooftop Bar in Bangkok" style={`--ar: ${foto.width} / ${foto.height}`} />
</MediaFrame>

<MediaFrame>
	<video
		controls
		preload="none"
		poster={poster.src}
		width={poster.width}
		height={poster.height}
		style={`--ar: ${poster.width} / ${poster.height}`}
	>
		<source src={video} type="video/mp4" />
	</video>
</MediaFrame>
