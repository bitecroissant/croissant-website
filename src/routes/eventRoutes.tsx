import { EventLayout } from '@/layout/EventsLayout'

export const eventRoutes = {
  path: 'events',
  element: <EventLayout />,
  children: [
    { index: true, element: '事件列表' },
    { path: 'edit/:id', element: '' },
    { path: 'show/:id', element: '' },
    { path: 'dates', element: '' },
  ],
}
