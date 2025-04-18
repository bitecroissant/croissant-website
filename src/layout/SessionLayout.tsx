import { Outlet } from 'react-router-dom'

export const SessionLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-100">
      <main className="container mx-auto px-4 py-8 flex flex-col items-center">
        <Outlet />
      </main>
    </div>
  )
}
