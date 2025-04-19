import { Outlet } from 'react-router-dom'

export const EventLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-100">

      <main className="container mx-auto">
        <Outlet />
      </main>

    </div>
  )
}
