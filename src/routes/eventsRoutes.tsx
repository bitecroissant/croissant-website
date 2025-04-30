import { AuthenticationGuard } from '@/components/AuthenticationGuard'
import { EventLayout } from '@/layout/EventsLayout'
import { EventDetailPage } from '@/pages/EventDetailPage'
import { EventEditPage } from '@/pages/EventEditPage'
import { EventsNewPage } from '@/pages/EventsNewPage'
import { EventsPage } from '@/pages/EventsPage'

export const eventsRoutes = {
  path: 'events',
  element: <EventLayout />,
  children: [
    { index: true, element: <AuthenticationGuard component={EventsPage} /> },
    { path: 'new', element: <EventsNewPage /> },
    { path: 'show/:id', element: <EventDetailPage /> },
    { path: 'edit/:id', element: <EventEditPage /> },
  ],
}
