import { ErrorPage } from '@/components/ErrorPage'
import { MainLayout } from '@/layout/MainLayout'
import { createBrowserRouter } from 'react-router-dom'
import { eventDatesRoutes } from './eventDatesRoutes'
import { eventsRoutes } from './eventsRoutes'
import { holidayRoutes } from './holidayRoutes'
import { poetryLineRoutes } from './poetryLineRoutes'
import { sessionRoutes } from './sessionRoutes'
import { solarTermsRoutes } from './solarTermsRoutes'

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <MainLayout />,
    children: [
      sessionRoutes,
      solarTermsRoutes,
      eventsRoutes,
      eventDatesRoutes,
      holidayRoutes,
      poetryLineRoutes,
    ],
  },
])
