import { AuthenticationGuard } from '@/components/AuthenticationGuard'
import { SolarTermsLayout } from '@/layout/SolarTermsLayout'
import { SolarTermDatesEditPage } from '@/pages/SolarTermDatesEditPage'
import { SolarTermDetailPage } from '@/pages/SolarTermDetailPage'
import { SolarTermEditPage } from '@/pages/SolarTermEditPage'
import { SolarTermsNewPage } from '@/pages/SolarTermsNewPage'
import { SolarTermsPage } from '@/pages/SolarTermsPage'

export const solarTermsRoutes = {
  path: 'solar-terms',
  element: <SolarTermsLayout />,
  children: [
    { index: true, element: <AuthenticationGuard component={SolarTermsPage} /> },
    { path: 'new', element: <AuthenticationGuard component={SolarTermsNewPage} /> },
    { path: 'show/:id', element: <AuthenticationGuard component={SolarTermDetailPage} /> },
    { path: 'edit/:id', element: <AuthenticationGuard component={SolarTermEditPage} /> },
    { path: 'dates', element: <AuthenticationGuard component={SolarTermDatesEditPage} /> },
  ],
}
