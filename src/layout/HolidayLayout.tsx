import { PageHeader } from '@/components/PageHeader'
import { Outlet } from 'react-router-dom'

export const HolidayLayout: React.FC = () => {
  return (
    <>
      <PageHeader />
      <Outlet />
    </>
  )
}
