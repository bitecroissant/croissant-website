import type { AppState } from '@auth0/auth0-react'
import { auth0ProviderOptions } from '@/auth0/auth0ProviderOptions'
import { Toaster } from '@/components/ui/toaster'
import { Auth0Provider } from '@auth0/auth0-react'
import { Outlet, useNavigate } from 'react-router-dom'

export const MainLayout: React.FC = () => {
  const nav = useNavigate()

  const onRedirectCallback = (appState?: AppState) => {
    nav(appState?.returnTo || window.location.pathname)
  }

  return (
    <Auth0Provider {...auth0ProviderOptions} onRedirectCallback={onRedirectCallback}>
      <main className="mainLayoutOutterContainer">
        {/* <span className="text-base">我能吞下玻璃而不伤身体</span> */}
        <Outlet />
        <Toaster />
      </main>
    </Auth0Provider>
  )
}
