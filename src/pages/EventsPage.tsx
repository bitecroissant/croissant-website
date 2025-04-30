import { EmptyPage } from '@/components/EmptyPage'
import { ErrorTip } from '@/components/ErrorTip'
import { PageLoading } from '@/components/PageLoading'
import { Button } from '@/components/ui/button'
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
    // if ((pathname === '/' || pathname === '/session') && isAuthenticated) {
    //   nav('/events')
    // }
    // if (!isLoading && !isAuthenticated) {
    //   nav('/session')
    // }
  }, [isLoadingToken, isAuthenticated])

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
          <>
            <ol className="pt-4 space-y-4">
              {eventsData.map(({ events, event_dates }) => (
                <li className="px-4" key={events.id}> <EventsPageListItem item={events} dates={event_dates} /> </li>
              ))}
            </ol>
            {eventsError && (<p>系统开小差了,请刷新页面重试...</p>)}
          </>
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
    <div className="pb-96 ">
      <p className="text-white text-xl">{isLoadingToken ? '加载中' : '加载完了'}{isAuthenticated ? '授权' : '未授权'}</p>
      {/* <EventsPageHeader title="我的事件" subtitle="管理和记录您重要的事件" /> */}
      {handleRender()}
      {/* <SiteNav /> */}
      <Button onClick={onClickNewEvent} className="fixed right-[5%] top-[70%] rounded-full w-[56px] h-[56px] shadow-lg [&_svg]:size-8">
        <Plus />
      </Button>
    </div>
  )
}
