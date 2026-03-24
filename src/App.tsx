import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { queryClient } from './api/queryClient'
import { Toaster } from './components/ui/sonner'
import { TooltipProvider } from './components/ui/tooltip'
import { ThemeProvider } from './contexts/theme-provider'
import { AppRouter } from './router/app-router'

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<BrowserRouter>
					<TooltipProvider>
						<AppRouter />
						<Toaster />
					</TooltipProvider>
				</BrowserRouter>
			</ThemeProvider>
		</QueryClientProvider>
	)
}
