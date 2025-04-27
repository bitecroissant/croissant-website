import { EmptyPage } from '@/components/EmptyPage'
import { ErrorTip } from '@/components/ErrorTip'
import { PageLoading } from '@/components/PageLoading'
import { SiteNav } from '@/components/SiteNav'
import { ajax } from '@/lib/ajax'
import useSWR from 'swr'
import { EventsPageHeader } from '../components/PageHeader'
import { EventsPageListItem } from './EventsPageListItem'

export const EventsPage: React.FC = () => {
  const { data: eventsData, error: eventsError, isLoading: eventsLoading } = useSWR(
    '/v1/events',
    async path => (await ajax.get<Resources<EventWithDates>>(path)).data.resources,
  )

  if (eventsLoading) {
    return <PageLoading />
  }

  const handleRender = () => {
    if (eventsData) {
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
      <EventsPageHeader title="我的事件" subtitle="管理和记录您重要的事件" />
      {handleRender()}
      <SiteNav />
    </div>
  )
}
