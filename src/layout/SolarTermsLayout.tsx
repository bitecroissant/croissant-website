import { PageHeader } from '@/components/PageHeader'
import { Outlet } from 'react-router-dom'

export const SolarTermsLayout: React.FC = () => {
  return (
    <>
      <PageHeader />
      <Outlet />
    </>
  )
}
