import { useEffect, useState } from 'react'
import { Button } from '@/components/button'

type Theme = 'light' | 'dark' | 'deep'

const themes: Theme[] = ['light', 'dark', 'deep']

const themeIcons: Record<Theme, string> = {
	light: '☀︎',
	dark: '☽',
	deep: '✦',
}

export function ThemeToggle() {
	const [theme, setTheme] = useState<Theme>('light')

	useEffect(() => {
		const saved = localStorage.getItem('theme') as Theme | null
		if (saved && themes.includes(saved)) {
			setTheme(saved)
			document.documentElement.setAttribute('data-theme', saved)
		}
	}, [])

	const cycleTheme = () => {
		const currentIndex = themes.indexOf(theme)
		const nextIndex = (currentIndex + 1) % themes.length
		const newTheme = themes[nextIndex]
		setTheme(newTheme)
		localStorage.setItem('theme', newTheme)
		document.documentElement.setAttribute('data-theme', newTheme)
	}

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={cycleTheme}
			className="text-base"
			aria-label={`Current theme: ${theme}. Click to switch theme.`}
			title={`Switch theme (current: ${theme})`}
		>
			{themeIcons[theme]}
		</Button>
	)
}
