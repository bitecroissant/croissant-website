import type { Auth0ProviderOptions } from '@auth0/auth0-react'

export const auth0ProviderOptions: Auth0ProviderOptions = {
  domain: 'bitecroissant.jp.auth0.com',
  clientId: '9lu1GnDXmZyT6CS8CfTCJh81eoJrOGMr',
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: 'https://croissant.jellybyte.uno',
  },
}
