import { Navigate } from 'react-router-dom'
import { useAuth } from '../../features/auth/AuthContext'

export function ProtectedRoute({ children }) {
  const { user } = useAuth()
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}

export function PublicOnlyRoute({ children }) {
  const { user } = useAuth()
  if (user) {
    return <Navigate to="/dashboard" replace />
  }
  return children
}

export function AdminRoute({ children }) {
  const { user } = useAuth()
  if (!user) {
    return <Navigate to="/login" replace />
  }
  if (user.role !== 'ADMIN') {
    return <Navigate to="/dashboard" replace />
  }
  return children
}