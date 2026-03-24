import { type ReactNode, useState } from 'react'
import { Navigate } from 'react-router-dom'

interface PrivateRouteProps {
	children: ReactNode
}

export function PrivateRoute({ children }: PrivateRouteProps) {
	// When implementing authentication, you can replace the isAuthenticated state with the actual authentication logic.
	// const { isAuthenticated } = useAuth()
	const [isAuthenticated, _] = useState(true)

	return isAuthenticated ? children : <Navigate to="/login" replace />
}
