import { CalendarDays } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'

export const EmptyPage: React.FC = () => {
  const nav = useNavigate()

  const onClickNewEvent = () => {
    nav('/events/new')
  }

  return (
    <div className="pt-16 flex flex-col items-center justify-center">
      <CalendarDays className="w-[64px] h-[64px] text-gray-700" />
      <h1 className="text-m mt-4 text-gray-700">您还没有创建任何事件</h1>
      <Button onClick={onClickNewEvent} className="mt-4 rounded-full">
        创建第一个事件
      </Button>
    </div>
  )
}
