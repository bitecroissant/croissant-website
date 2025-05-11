import type { AppState } from '@auth0/auth0-react'
import bgImg from '@/assets/images/app-bg.jpg'
import { auth0ProviderOptions } from '@/auth0/auth0ProviderOptions'
import { Toaster } from '@/components/ui/toaster'
import { Auth0Provider } from '@auth0/auth0-react'
import cs from 'classnames'
import { Outlet, useNavigate } from 'react-router-dom'

export const MainLayout: React.FC = () => {
  const nav = useNavigate()

  const onRedirectCallback = (appState?: AppState) => {
    nav(appState?.returnTo || window.location.pathname)
  }

  return (
    <Auth0Provider {...auth0ProviderOptions} onRedirectCallback={onRedirectCallback}>
      <main style={{ background: `url(${bgImg})` }} className={cs('bg-[#ecf2fe] min-h-full bg-fixed bg-no-repeat bg-cover relative overflow-x-hidden pb-24 text-[#404040]')}>
        {/* <span className="text-base">我能吞下玻璃而不伤身体</span> */}
        <div className="min-h-[1000px]">
          <Outlet />
        </div>
        <Toaster />
      </main>
    </Auth0Provider>
  )
}
