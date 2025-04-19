import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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
      <Button onClick={onClickNewEvent} className="fonts-jinbuti text-2xl" variant="link">
        没有事件，去新增
      </Button>

      <div className="rounded-lg p-6 shadow-lg">
      </div>
    </>
  )
}
