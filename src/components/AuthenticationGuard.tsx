import { withAuthenticationRequired } from '@auth0/auth0-react'
import React from 'react'
import { PageLoading } from './PageLoading'

interface Props {
  component: any
}

export const AuthenticationGuard: React.FC<Props> = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <PageLoading />
      </div>
    ),
  })

  return <Component />
}
