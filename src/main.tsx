import { Auth0Provider } from '@auth0/auth0-react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { auth0ProviderOptions } from './auth0/auth0ProviderOptions'
import { router } from './routes/router'
import './index.scss'

const div = document.getElementById('root')
const root = createRoot(div!)
root.render(
  <StrictMode>
    <Auth0Provider {...auth0ProviderOptions}>
      <RouterProvider router={router} />
    </Auth0Provider>
  </StrictMode>,
)
