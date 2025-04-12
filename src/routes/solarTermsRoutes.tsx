import { SolarTermsLayout } from '@/layout/SolarTermsLayout'

export const solarTermsRoutes = {
  path: 'solar-terms',
  element: <SolarTermsLayout />,
  children: [
    { index: true, element: '24节气' },
    { path: 'edit/:id', element: '' },
    { path: 'show/:id', element: '' },
    { path: 'dates/:year', element: '' },
  ],
}
