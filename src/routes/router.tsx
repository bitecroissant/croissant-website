import { ErrorPage } from '@/components/ErrorPage'
import { MainLayout } from '@/layout/MainLayout'
import { SginInPage } from '@/pages/SignInPage'
import { createBrowserRouter } from 'react-router-dom'
import { eventDatesRoutes } from './eventDatesRoutes'
import { eventsRoutes } from './eventsRoutes'
import { holidaysRoutes } from './holidaysRoutes'
import { poetryLinesRoutes } from './poetryLinesRoutes'
import { solarTermsRoutes } from './solarTermsRoutes'

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <MainLayout />,
    children: [
      { index: true, element: <SginInPage /> },
      solarTermsRoutes,
      eventsRoutes,
      eventDatesRoutes,
      holidaysRoutes,
      poetryLinesRoutes,
    ],
  },
])
