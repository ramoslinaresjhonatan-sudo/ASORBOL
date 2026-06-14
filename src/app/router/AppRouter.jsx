import { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { routes } from './routes.config'
import PrivateRoute from './PrivateRoute'
import RoleRoute from './RoleRoute'
import DashboardLayout from '../../layouts/DashboardLayout'
import AuthLayout from '../../layouts/AuthLayout'
import Loader from '../../shared/components/Loader'

const getLayout = (layout, children) => {
  switch (layout) {
    case 'dashboard': return <DashboardLayout>{children}</DashboardLayout>
    case 'auth': return <AuthLayout>{children}</AuthLayout>
    default: return children
  }
}

const AppRouter = () => {
  return (
    <Suspense fallback={<Loader fullscreen />}>
      <Routes>
        {routes.map(({ path, component: Component, private: isPrivate, roles, layout }) => {
          let element = getLayout(layout, <Component />)

          if (isPrivate && roles?.length > 0) {
            element = <RoleRoute roles={roles}>{getLayout(layout, <Component />)}</RoleRoute>
          } else if (isPrivate) {
            element = <PrivateRoute>{getLayout(layout, <Component />)}</PrivateRoute>
          }

          return <Route key={path} path={path} element={element} />
        })}
      </Routes>
    </Suspense>
  )
}

export default AppRouter
