import { PageLoading } from '@/components/PageLoading'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { MainLayoutHeader } from './MainLayoutHeader'

export const MainLayout: React.FC = () => {
  const nav = useNavigate()
  const location = useLocation()
  const { pathname } = location

  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const setJwt = async () => {
    const jwt = await getAccessTokenSilently()
    const savedJwt = window.localStorage.getItem('jwt') || ''
    if (jwt && jwt !== savedJwt) {
      window.localStorage.setItem('jwt', jwt)
    }
  }

  useEffect(() => {
    setJwt()
  }, [isAuthenticated])

  useEffect(() => {
    if ((pathname === '/' || pathname === '/session') && isAuthenticated) {
      nav('/events')
    }
    if (!isLoading && !isAuthenticated) {
      nav('/session')
    }
  }, [isLoading, isAuthenticated])

  if (isLoading) {
    return <PageLoading />
  }

  return (
    <>
      <MainLayoutHeader />
      <Outlet />
    </>
  )
}
