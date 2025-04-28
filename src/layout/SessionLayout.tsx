import { Outlet } from 'react-router-dom'

export const SessionLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#1c3157] flex flex-col items-center justify-center">
      <main className="container mx-auto px-8 pb-8 flex flex-col items-center">
        <Outlet />
      </main>
    </div>
  )
}
