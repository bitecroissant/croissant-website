import { Icon } from '@/components/Icon'
import { PageLoading } from '@/components/PageLoading'
import { SiteNav } from '@/components/SiteNav'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ajax } from '@/lib/ajax'
import cs from 'classnames'
import { Ban, CalendarDays, ChevronDown, History, Loader, Pin, RefreshCw } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useSWRInfinite from 'swr/infinite'
import { EventsPageHeader } from '../components/PageHeader'

function getKey(pageIndex: number, prev: Resources<Event>) {
  if (prev) {
    const recievedCount = (prev.pager.page_no - 1) * prev.pager.per_page + prev.resources.length
    const total = prev.pager.total
    if (recievedCount >= total) { return null }
  }
  return `/v1/events?page_no=${pageIndex + 1}` // SWR key
}

export const EventsPage: React.FC = () => {
  const { data: eventsData, error: eventsError, isLoading: eventsLoading, isValidating: eventsValidating, size, setSize } = useSWRInfinite(
    getKey,
    async path => (await ajax.get<Resources<Event>>(path)).data,
  )
  const nav = useNavigate()
  const onClickNewEvent = () => {
    nav('/events/new')
  }
  const loadEvents = async () => {
  }
  useEffect(() => {
    loadEvents()
  }, [])

  const onLoadMore = () => {
    setSize(size + 1)
  }

  if (eventsError) {
    return <div>{JSON.stringify(eventsError)}</div>
  }

  if (eventsLoading) {
    return <PageLoading />
  }

  return (
    <div className="pb-96 ">
      <EventsPageHeader title="我的事件" subtitle="管理和记录您重要的事件" />
      {eventsData
        ? (
            <>
              <ol className="pt-4 space-y-4">
                {eventsData.map(({ resources }) => {
                  return resources.map((item) => {
                    return (
                      <li className="px-4" key={item.id}>
                        <Card className={cs('relative flex p-4 space-x-4')}>
                          <Badge className="rounded-full h-[52px] w-[52px] p-0 flex items-center justify-center bg-orange-600">
                            <Icon className="text-white" name={item.icon_name || 'robot'} />
                          </Badge>
                          <div className="flex-1">
                            <p>
                              {item.emoji && <span>{item.emoji}</span>}
                              <span className="fonts-jinbuti font-bold">{item.name}</span>
                            </p>
                            <div className="flex items-center justify-between text-s space-x-1 text-gray-500">
                              <p className="flex items-center just"><History className="h-[18px] w-[18px] mr-1" /> 过了大约 239999 天</p>
                              <p>2025-12-31</p>
                            </div>
                          </div>

                          <div className="absolute right-0 top-0 flex space-x-2 p-2">
                            {item.is_pin > 0 && <Badge className="rounded-full h-[24px] w-[24px] p-0 flex items-center justify-center bg-orange-600"><Pin className="w-[14px] h-[14px] text-white" /></Badge>}
                            {item.is_loop > 0 && <Badge className="rounded-full h-[24px] w-[24px] p-0 flex items-center justify-center bg-blue-600"><RefreshCw className="w-[14px] h-[14px] text-white" /></Badge>}
                            {!(item.is_active > 0) && <Badge className="rounded-full h-[24px] w-[24px] p-0 flex items-center justify-center bg-red-600"><Ban className="w-[14px] h-[14px] text-white" /></Badge>}
                          </div>
                        </Card>
                      </li>
                    )
                  })
                })}
              </ol>
              <div className="flex justify-center mt-4">
                <Button
                  className="shadow-lg rounded-full"
                  variant="outline"
                  disabled={eventsValidating || eventsLoading}
                  onClick={onLoadMore}
                >
                  {(eventsLoading || eventsValidating) ? <Loader className="animate-spin" /> : <ChevronDown />}
                  {(eventsLoading || eventsValidating) ? '加载中...' : '加载更多'}
                </Button>
              </div>
            </>
          )
        : (
            <div className="pt-16 flex flex-col items-center justify-center">
              <CalendarDays className="w-[64px] h-[64px] text-gray-700" />
              <h1 className="text-m mt-4 text-gray-700">您还没有创建任何事件</h1>
              <Button onClick={onClickNewEvent} className="mt-4 rounded-full">
                创建第一个事件
              </Button>
            </div>
          )}
      <SiteNav />
    </div>
  )
}
