import { Button } from '@/components/ui/button'
import { CalendarDays } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { EventsPageHeader } from '../components/PageHeader'

export const EventsPage: React.FC = () => {
  // const { isAuthenticated } = useAuth0()
  // const { data: eventsData, error: eventsError } = useSWR(isAuthenticated ? '/v1/events' : null, (path) => {
  //   return ajax.get(path)
  // })
  const nav = useNavigate()
  const onClickNewEvent = () => {
    nav('/events/new')
  }
  const loadEvents = async () => {
  }
  useEffect(() => {
    loadEvents()
  }, [])

  return (
    <>
      <EventsPageHeader title="我的事件" subtitle="管理和记录您重要的事件" />

      <div className="pt-16 flex flex-col items-center justify-center">
        <CalendarDays className="w-[64px] h-[64px] text-gray-700" />
        <h1 className="text-m mt-4 text-gray-700">您还没有创建任何事件</h1>
        <Button onClick={onClickNewEvent} className="mt-4 rounded-full">
          创建第一个事件
        </Button>
      </div>

    </>
  )
}
