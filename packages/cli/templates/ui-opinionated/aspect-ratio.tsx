import { AspectRatio } from '@/components/ui/aspect-ratio'

// Common aspect ratio presets
const AspectRatioSquare = (props: React.ComponentProps<typeof AspectRatio>) => (
	<AspectRatio ratio={1} {...props} />
)
const AspectRatioVideo = (props: React.ComponentProps<typeof AspectRatio>) => (
	<AspectRatio ratio={16 / 9} {...props} />
)
const AspectRatioPortrait = (props: React.ComponentProps<typeof AspectRatio>) => (
	<AspectRatio ratio={3 / 4} {...props} />
)

import * as React from 'react'
export { AspectRatio, AspectRatioSquare, AspectRatioVideo, AspectRatioPortrait }
