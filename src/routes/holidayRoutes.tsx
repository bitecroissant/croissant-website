import { HolidayLayout } from '@/layout/HolidayLayout'

export const holidayRoutes = {
  path: 'holiday',
  element: <HolidayLayout />,
  children: [
    { index: true, element: '节日列表' },
    { path: 'show/:id', element: '' },
    { path: 'edit/:id', element: '' },
    { path: 'dates/:year', element: '' },
  ],
}
