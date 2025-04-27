import type { MouseEventHandler } from 'react'
import type { EventsDatesType } from './EventDateForm'
import { EmptyPage } from '@/components/EmptyPage'
import { ErrorTip } from '@/components/ErrorTip'
import { Icon } from '@/components/Icon'
import { EventsPageHeader } from '@/components/PageHeader'
import { PageLoading } from '@/components/PageLoading'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ajax } from '@/lib/ajax'
import { n2b } from '@/lib/helpers'
import { time } from '@/lib/time'
import { CalendarPlus, Loader } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'
import { EventDateForm } from './EventDateForm'

export const EventDetailPage: React.FC = () => {
  const nav = useNavigate()
  const params = useParams()

  const { data: eventData, error, isLoading } = useSWR(params.id ? `/v1/event/${params.id}` : null, async (path) => {
    return (await ajax.get<Resource<Event>>(path)).data.resource
  })

  const { data: eventDatesData } = useSWR(eventData ? `/v1/event_dates/${params.id}` : null, async (path) => {
  // const { data: eventDatesData, error: eventDatesError, isLoading: eventDatesLoading } = useSWR(eventData ? `/v1/event_dates/${params.id}` : null, async (path) => {
    return (await ajax.get<Resources<EventDate>>(path)).data.resources
  })

  const [submiting, setSubmiting] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [updatingPinStatus, setUpdatingPinStatus] = useState(false)
  const [updatingActiveStatus, setUpdatingActiveStatus] = useState(false)

  const [selectedEventDate, setSelectedEventDate] = useState<EventDate | null>(null)

  useEffect(() => {
    const { id } = params
    if (!id) { throw new Error('没id') }
  }, [])

  // Submit & Update event date
  const onSubmit = async (values: EventsDatesType) => {
    setSubmiting(true)
    await ajax.post(`/v1/event_date`, { happen_at: time(values.happen_at).format(), events_id: params.id }).finally(() => setSubmiting(false))
  }

  const onUpdate = async (values: EventsDatesType) => {
    setSubmiting(true)
    await ajax.put(`/v1/event_date/${values.event_date_id}`, { happen_at: time(values.happen_at).format(), events_id: params.id }).finally(() => setSubmiting(false))
  }

  const onClickEdit = () => {
    eventData && nav(`/events/edit/${eventData.id}`)
  }

  const onClickDelete = async () => {
    setDeleting(true)
    await ajax.delete(`/v1/event/${params.id}`).finally(() => { setDeleting(false) })
  }

  const onClickTogglePin = async () => {
    if (!eventData) { return }
    setUpdatingPinStatus(true)

    const { id, name, emoji, icon_name, icon_color, is_pin, is_loop, is_active } = eventData
    const payload = { id, name, emoji, icon_color, icon_name, is_pin: !(is_pin > 0), is_loop: n2b(is_loop), is_active: n2b(is_active) }
    await ajax.put(`/v1/event/${params.id}`, payload).finally(() => { setUpdatingPinStatus(false) })
  }

  const onClickToggleActive = async () => {
    if (!eventData) { return }
    setUpdatingActiveStatus(true)
    const { id, name, emoji, icon_name, icon_color, is_pin, is_loop, is_active } = eventData
    const payload = { id, name, emoji, icon_color, icon_name, is_pin: n2b(is_pin), is_loop: n2b(is_loop), is_active: !(is_active > 0) }
    await ajax.put(`/v1/event/${params.id}`, payload).finally(() => { setUpdatingActiveStatus(false) })
  }

  const onDeleteEventDate = async (id: string) => {
    await ajax.delete(`/v1/event_date/${id}`)
  }

  const onCancel: MouseEventHandler<HTMLButtonElement> = (ev) => {
    ev.preventDefault()
    setSelectedEventDate(null)
  }

  if (isLoading) {
    return (<PageLoading />)
  }

  if (error) {
    return (<ErrorTip />)
  }

  if (!eventData) {
    return (<EmptyPage />)
  }

  return (
    <>
      <EventsPageHeader title="事件详情" showBack={true} />
      <main className="space-y-4">
        <Card>
          <p>icon: <Icon name={eventData.icon_name || ''} /></p>
          <p>名字: {eventData.name}</p>
          <p>重复：{eventData.is_loop}</p>
          <p>置顶：{eventData.is_pin}</p>
          <p>emoji：{eventData.emoji}</p>
          <p>color：{eventData.icon_color}</p>
          <p>生效：{eventData.is_active}</p>
        </Card>
        <section>
          <h1>记录发生时间</h1>
          <Card className="p-4">
            {
              selectedEventDate
                ? (<EventDateForm key={selectedEventDate.id} defaultValues={{ event_date_id: selectedEventDate.id, happen_at: time(selectedEventDate.happen_at).date }} onSubmit={onUpdate} submiting={submiting} onCancel={onCancel} />)
                : (<EventDateForm defaultValues={{ happen_at: time().date }} onSubmit={onSubmit} submiting={submiting} />)
            }
          </Card>
        </section>
        <section>
          <h1>记录发生时间</h1>
          <Card>
            <ul>
              {eventDatesData && eventDatesData.map(item => (
                <li key={item.id} className="">
                  <p className="font-bold"><span>happen_at: </span>{item.happen_at}</p>
                  <p><span>id: </span>{item.id}</p>
                  <p><span>gmt_create: </span>{time(item.gmt_create).format('yyyy MM dd HH mm ss ')}</p>
                  <p><span>gmt_modified: </span>{time(item.gmt_modified).format('yyyy MM dd HH mm ss ')}</p>
                  <p><span>delete_flag: </span>{item.delete_flag}</p>
                  <p><span>is_active: </span>{item.is_active}</p>
                  <p><span>creator: </span>{item.creator}</p>
                  <p><span>events_id: </span>{item.events_id}</p>
                  <p><span>type: </span>{item.type}</p>
                  <Button onClick={() => { setSelectedEventDate(item) }}>修改</Button>
                  <Button onClick={() => onDeleteEventDate(item.id)}>删除</Button>
                  <Separator className="my-4" />
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <Card className="space-y-4">
          <Button className="w-full" onClick={onClickEdit}>
            <CalendarPlus /> 编辑
          </Button>

          <Button className="w-full" onClick={onClickDelete}>
            {deleting && <Loader className="animate-spin w-4 h-4 opacity-50" />}
            {deleting ? (<span className="opacity-50">删除中...</span>) : (<><CalendarPlus /> 删除</>)}
          </Button>

          <Button className="w-full" onClick={onClickTogglePin}>
            {updatingPinStatus && <Loader className="animate-spin w-4 h-4 opacity-50" />}
            {updatingPinStatus ? (<span className="opacity-50">修改中...</span>) : (<><CalendarPlus /> { eventData.is_pin ? '取消置顶' : '置顶' }</>)}
          </Button>

          <Button className="w-full" onClick={onClickToggleActive}>
            {submiting && <Loader className="animate-spin w-4 h-4 opacity-50" />}
            {updatingActiveStatus ? (<span className="opacity-50">修改中...</span>) : (<><CalendarPlus /> { eventData.is_active ? '失效' : '生效' } </>)}
          </Button>
        </Card>

      </main>
    </>
  )
}
