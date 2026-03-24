import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../contexts/theme-provider'
import { Button } from './ui/button'

export function ThemeToggle() {
	const { setTheme, theme } = useTheme()

	const onToggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light')
	}

	return (
		<Button
			size="icon"
			variant="ghost"
			title="Toggle theme"
			onClick={onToggleTheme}
		>
			{theme === 'light' ? <Moon /> : <Sun />}
		</Button>
	)
}
