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
      <main className=" bg-gradient-to-r from-[#080f18] via-[#030a15] to-[#080f18] relative min-h-screen list-none ">
        <Outlet />
        <Toaster />
      </main>
    </Auth0Provider>
  )
}
