import { EventDatesLayout } from '@/layout/EventDatesLayout'

export const eventDatesRoutes = {
  path: 'events-dates',
  element: <EventDatesLayout />,
  children: [
    { index: true, element: '日期列表' },
    { path: 'edit/:id', element: '' },
  ],
}
