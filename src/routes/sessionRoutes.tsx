import { SessionLayout } from '@/layout/SessionLayout'
import { SginInPage } from '@/pages/SignInPage'

export const sessionRoutes = {
  path: 'session',
  element: <SessionLayout />,
  children: [
    { index: true, element: <SginInPage /> },
  ],
}
