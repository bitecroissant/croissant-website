import { EventLayout } from '@/layout/EventsLayout'
import { EventsNewPage } from '@/pages/EventsNewPage'
import { EventsPage } from '@/pages/EventsPage'

export const eventsRoutes = {
  path: 'events',
  element: <EventLayout />,
  children: [
    { index: true, element: <EventsPage /> },
    { path: 'new', element: <EventsNewPage /> },
    { path: 'edit/:id', element: '' },
    { path: 'show/:id', element: '' },
  ],
}
