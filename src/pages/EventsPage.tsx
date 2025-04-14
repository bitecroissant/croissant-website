import { Button } from '@/components/ui/button'
import { ajax } from '@/lib/ajax'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const EventsPage: React.FC = () => {
  const nav = useNavigate()
  const onClickNewEvent = () => {
    nav('/events/new')
  }
  const loadEvents = async () => {
    const d = await ajax.get('/v1/events?per_page=1&page_no=1')
    window.console.log(d)
  }
  useEffect(() => {
    loadEvents()
  }, [])

  return (
    <>
      <Button onClick={onClickNewEvent} className="fonts-jinbuti text-2xl" variant="link">
        没有事件，去新增
      </Button>

      <div className="rounded-lg p-6 shadow-lg">
      </div>
    </>
  )
}
