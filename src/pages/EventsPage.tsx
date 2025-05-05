import { EmptyPage } from '@/components/EmptyPage'
import { ErrorTip } from '@/components/ErrorTip'
import { PageLoading } from '@/components/PageLoading'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ajax } from '@/lib/ajax'
import { useAuth0 } from '@auth0/auth0-react'
import { Plus } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import { EventsPageListItem } from './EventsPageListItem'

export const EventsPage: React.FC = () => {
  const { data: eventsData, error: eventsError, isLoading: eventsLoading } = useSWR(
    '/v1/events',
    async path => (await ajax.get<Resources<EventWithDates>>(path)).data.resources,
  )

  const { isLoading: isLoadingToken, isAuthenticated, getAccessTokenSilently } = useAuth0()

  const setJwt = async () => {
    const jwt = await getAccessTokenSilently()
    const savedJwt = window.localStorage.getItem('jwt') || ''
    if (jwt && jwt !== savedJwt) {
      window.localStorage.setItem('jwt', jwt)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      setJwt()
    }
  }, [isAuthenticated])

  const nav = useNavigate()

  const onClickNewEvent = () => {
    nav('/events/new')
  }

  if (isLoadingToken) {
    return <PageLoading />
  }

  if (eventsLoading) {
    return <PageLoading />
  }

  const handleRender = () => {
    if (eventsData && eventsData.length > 0) {
      if (!eventsError) {
        return (
          <ScrollArea className="mt-24 max-w-[700px] mx-auto space-y-2 p-4">
            <h1 className="text-center text-4xl pb-7">我的事件</h1>
            <ol className=" space-y-4 bg-white rounded shadow-xl p-4 ">
              {eventsData.map(({ events, event_dates }) => (
                <li className="" key={events.id}>
                  <EventsPageListItem item={events} dates={event_dates} />
                </li>
              ))}
            </ol>
            {eventsError && (<p className="pt-24">系统开小差了,请刷新页面重试...</p>)}
          </ScrollArea>
        )
      }
    }
    else {
      if (!eventsError) {
        return (<EmptyPage />)
      }
      else {
        return (<ErrorTip />)
      }
    }
  }

  return (
    <div className=" min-h-[1000px] ">
      {handleRender()}
      <Button onClick={onClickNewEvent} className="fixed right-[5%] top-[70%] rounded-full w-[56px] h-[56px] shadow-lg [&_svg]:size-8">
        <Plus />
      </Button>

      {/* <SiteNav /> */}
    </div>
  )
}
