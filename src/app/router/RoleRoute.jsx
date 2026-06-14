import { Navigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'

const RoleRoute = ({ children, roles = [] }) => {
  const { user } = useAuthStore()

  if (!user) return <Navigate to="/login" replace />

  if (roles.length > 0 && !roles.includes(user.tipo)) {
    return <Navigate to="/403" replace />
  }

  return children
}

export default RoleRoute
