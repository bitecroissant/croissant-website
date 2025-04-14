import { EventDatesLayout } from '@/layout/EventDatesLayout'
import { EventsDatesPage } from '@/pages/EventsDatesPage'

export const eventDatesRoutes = {
  path: 'events-dates',
  element: <EventDatesLayout />,
  children: [
    { index: true, element: <EventsDatesPage /> },
    { path: 'edit/:id', element: '' },
  ],
}
