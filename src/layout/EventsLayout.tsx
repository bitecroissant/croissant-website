import { PageHeader } from '@/components/PageHeader'
import { Outlet } from 'react-router-dom'

export const EventLayout: React.FC = () => {
  return (
    <>
      <PageHeader />
      <Outlet />
    </>
  )
}
