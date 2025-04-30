import { PageLoading } from '@/components/PageLoading'
import { Toaster } from '@/components/ui/toaster'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
// import { Outlet } from 'react-router-dom'

export const MainLayout: React.FC = () => {
  // const nav = useNavigate()
  // const location = useLocation()
  // const { pathname } = location

  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const setJwt = async () => {
    const jwt = await getAccessTokenSilently()
    const savedJwt = window.localStorage.getItem('jwt') || ''
    if (jwt && jwt !== savedJwt) {
      window.localStorage.setItem('jwt', jwt)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line no-alert
    window.alert(window.location.origin)
  }, [])

  useEffect(() => {
    // if ((pathname === '/' || pathname === '/session') && isAuthenticated) {
    //   // eslint-disable-next-line no-alert
    //   window.alert(`${isLoading} && ${isAuthenticated}`)
    //   nav('/events')
    // }
    // if (!isLoading && !isAuthenticated) {
    //   // eslint-disable-next-line no-alert
    //   window.alert(`${isLoading} && ${isAuthenticated}`)
    //   nav('/session')
    // }
  }, [isLoading, isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) {
      setJwt()
    }
  }, [isAuthenticated])

  if (isLoading) {
    return <PageLoading />
  }

  return (
    <main className=" bg-gradient-to-r from-[#080f18] via-[#030a15] to-[#080f18] relative min-h-screen list-none ">
      <p className="text-white text-xl">{isLoading ? '加载中' : '加载完了'}{isAuthenticated ? '授权' : '未授权'}</p>
      {/* <Outlet /> */}
      <Toaster />
    </main>
  )
}
