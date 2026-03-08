import { useEffect, useState } from 'react'
import { Button } from '@/components/ui-opinionated/button'

type Theme = 'light' | 'dark' | 'deep'

const themes: Theme[] = ['light', 'dark', 'deep']

const themeIcons: Record<Theme, string> = {
	light: '☀︎',
	dark: '☽',
	deep: '✦',
}

export function ThemeToggle() {
	const [theme, setTheme] = useState<Theme>('light')

	const applyTheme = (t: Theme) => {
		if (t === 'light') {
			document.documentElement.removeAttribute('data-theme')
		} else {
			document.documentElement.setAttribute('data-theme', t)
		}
	}

	useEffect(() => {
		const saved = localStorage.getItem('theme') as Theme | null
		if (saved && themes.includes(saved)) {
			setTheme(saved)
			applyTheme(saved)
		}
	}, [])

	const cycleTheme = () => {
		const currentIndex = themes.indexOf(theme)
		const nextIndex = (currentIndex + 1) % themes.length
		const newTheme = themes[nextIndex]
		setTheme(newTheme)
		localStorage.setItem('theme', newTheme)
		applyTheme(newTheme)
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
