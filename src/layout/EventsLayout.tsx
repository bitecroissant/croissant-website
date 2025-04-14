import { Outlet } from 'react-router-dom'

export const EventLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  )
}
