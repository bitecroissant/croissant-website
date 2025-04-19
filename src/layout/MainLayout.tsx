import { PageLoading } from '@/components/PageLoading'
import { Menubar } from '@/components/ui/menubar'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { useAuth0 } from '@auth0/auth0-react'
import { Car, Milk, PartyPopper, PersonStanding, Sun } from 'lucide-react'
import { useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import s from './MainLayout.module.scss'
import cs from 'classnames'
import { Card } from '@/components/ui/card'

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
    if ((pathname === '/' || pathname === '/session') && isAuthenticated) {
      nav('/events')
    }
    if (!isLoading && !isAuthenticated) {
      nav('/session')
    }
  }, [isLoading, isAuthenticated])

  useEffect(() => {
    setJwt()
  }, [isAuthenticated])

  if (isLoading) {
    return <PageLoading />
  }

  return (
    <div className="relative min-h-full list-none ">
      <Outlet />
      <Card className='fixed bottom-8 left-2 shadow-lg rounded-full flex px-6 py-2 space-x-8'>
          <Link to="/events" className={ cs("flex flex-col py-1 px-2 rounded-xl border-none ", pathname.indexOf("/events") > -1 ? "bg-[#e11d48]/30" : "") }>
            <PersonStanding className={cs("w-[32px] h-[32px] ", pathname.indexOf("/events") > -1 ? "text-[#e11d48]" : "text-gray-500" )} />
            <p className={cs("mt-1 text-[14px]", pathname.indexOf("/events") > -1 ? "text-[#e11d48]" : "text-gray-500" )}>事件</p>
          </Link>

          <Link to="/solar-terms" className={ cs("flex flex-col py-1 px-2 rounded-xl border-none ", pathname.indexOf("/solar-terms") > -1 ? "bg-[#e11d48]/30" : "") }>
            <Sun className={cs("w-[32px] h-[32px] ", pathname.indexOf("/solar-terms") > -1 ? "text-[#e11d48]" : "text-gray-500" )} />
            <p className={cs("mt-1 text-[14px]", pathname.indexOf("/solar-terms") > -1 ? "text-[#e11d48]" : "text-gray-500" )}>节气</p>
          </Link>

          <Link to="/poetry-lines" className={ cs("flex flex-col py-1 px-2 rounded-xl border-none ", pathname.indexOf("/poetry-lines") > -1 ? "bg-[#e11d48]/30" : "") }>
            <Milk className={cs("w-[32px] h-[32px] ", pathname.indexOf("/poetry-lines") > -1 ? "text-[#e11d48]" : "text-gray-500" )} />
            <p className={cs("mt-1 text-[14px]", pathname.indexOf("/poetry-lines") > -1 ? "text-[#e11d48]" : "text-gray-500" )}>诗句</p>
          </Link>

          <Link to="/holidays" className={ cs("flex flex-col py-1 px-2 rounded-xl border-none ", pathname.indexOf("/holidays") > -1 ? "bg-[#e11d48]/30" : "") }>
            <PartyPopper className={cs("w-[32px] h-[32px] ", pathname.indexOf("/holidays") > -1 ? "text-[#e11d48]" : "text-gray-500" )} />
            <p className={cs("mt-1 text-[14px]", pathname.indexOf("/holidays") > -1 ? "text-[#e11d48]" : "text-gray-500" )}>节日</p>
          </Link>
       
      </Card>
    </div>
  )
}
