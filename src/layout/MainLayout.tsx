import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export const MainLayout: React.FC = () => {
  return (
    <div>
      <div className="fonts-jinbuti p-[32px]">
        Croissant

        <Button disabled className="mx-[32px]">
          <Loader className="animate-spin" />
          Button
        </Button>
      </div>

      <Outlet />
    </div>
  )
}
