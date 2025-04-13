import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { MainLayoutHeader } from './MainLayoutHeader'

export const MainLayout: React.FC = () => {
  const nav = useNavigate()
  const location = useLocation()
  const { pathname } = location

  const { isLoading, isAuthenticated } = useAuth0()
  useEffect(() => {
    if (pathname === '/' && isAuthenticated) {
      nav('/events-dates')
    }
    if (!isLoading && !isAuthenticated) {
      nav('/session')
    }
  }, [isLoading, isAuthenticated])

  return (
    <>
      <MainLayoutHeader />
      <Outlet />
    </>
  )
}
