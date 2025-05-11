import { PageHeader } from '@/components/PageHeader'
import { Outlet } from 'react-router-dom'

export const PoetryLineLayout: React.FC = () => {
  return (
    <>
      <PageHeader />
      <Outlet />
    </>
  )
}
