import { HomeIcon } from 'lucide-react'
import { ForgotPassword, Home, SignIn, SignUp } from '@/pages'

type RoutesProps =
	| {
			path: string
			label: string
			showOnLayout: true
			isProtected: boolean
			children?: RoutesProps[]
			icon: React.ComponentType
			element: React.ComponentType
	  }
	| {
			path?: string
			label?: string
			showOnLayout: false
			isProtected: boolean
			children?: RoutesProps[]
			icon?: React.ComponentType
			element: React.ComponentType
	  }

export const routes: RoutesProps[] = [
	{
		path: '/app',
		element: Home,
		label: 'Home',
		icon: HomeIcon,
		isProtected: true,
		showOnLayout: true,
	},
	{ path: '/', element: SignIn, showOnLayout: false, isProtected: false },
	{
		path: '/forgot-password',
		showOnLayout: false,
		element: ForgotPassword,
		isProtected: false,
	},
	{
		path: '/sign-up',
		showOnLayout: false,
		element: SignUp,
		isProtected: false,
	},
]
