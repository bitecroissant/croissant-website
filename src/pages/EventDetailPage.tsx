import type { MouseEventHandler } from 'react'
import type { EventsDatesType } from './EventDateForm'
import { EmptyPage } from '@/components/EmptyPage'
import { ErrorTip } from '@/components/ErrorTip'
import { Icon } from '@/components/Icon'
import { EventsPageHeader } from '@/components/PageHeader'
import { PageLoading } from '@/components/PageLoading'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { ajax } from '@/lib/ajax'
import { n2b } from '@/lib/helpers'
import { time } from '@/lib/time'
import { Ban, CircleX, FilePenLine, History, Loader, MapPinCheck, NotepadText, PencilRuler, Pin, RefreshCw, Settings, Sparkles, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'
import { EventDateForm } from './EventDateForm'

export const EventDetailPage: React.FC = () => {
  const nav = useNavigate()
  const params = useParams()
  const { toast } = useToast()

  const { data: eventData, error, isLoading, mutate: mutateEvent } = useSWR(params.id ? `/v1/event/${params.id}` : null, async (path) => {
    return (await ajax.get<Resource<Event>>(path)).data.resource
  })

  const { data: eventDatesData, mutate: mutateEventDates } = useSWR(eventData ? `/v1/event_dates/${params.id}` : null, async (path) => {
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
    mutateEventDates()
  }

  const onUpdate = async (values: EventsDatesType) => {
    setSubmiting(true)
    await ajax.put(`/v1/event_date/${values.event_date_id}`, { happen_at: time(values.happen_at).format(), events_id: params.id }).finally(() => setSubmiting(false))
    mutateEventDates()
  }

  const onDeleteEventDate = async (id: string) => {
    await ajax.delete(`/v1/event_date/${id}`)
    mutateEventDates()
  }

  const onClickEdit = () => {
    eventData && nav(`/events/edit/${eventData.id}`)
  }

  const onClickDelete = async () => {
    setDeleting(true)
    await ajax.delete(`/v1/event/${params.id}`).finally(() => { setDeleting(false) })
    toast({ title: '事件删除成功', description: `${eventData?.name} 被删除啦`, action: (<ToastAction altText="我晓得了">我晓得了</ToastAction>) })
    nav('/events')
  }

  const onClickTogglePin = async () => {
    if (!eventData) { return }
    setUpdatingPinStatus(true)

    const { id, name, emoji, icon_name, icon_color, is_pin, is_loop, is_active } = eventData
    const payload = { id, name, emoji, icon_color, icon_name, is_pin: !(is_pin > 0), is_loop: n2b(is_loop), is_active: n2b(is_active) }
    await ajax.put(`/v1/event/${params.id}`, payload).finally(() => { setUpdatingPinStatus(false) })
    mutateEvent()
  }

  const onClickToggleActive = async () => {
    if (!eventData) { return }
    setUpdatingActiveStatus(true)
    const { id, name, emoji, icon_name, icon_color, is_pin, is_loop, is_active } = eventData
    const payload = { id, name, emoji, icon_color, icon_name, is_pin: n2b(is_pin), is_loop: n2b(is_loop), is_active: !(is_active > 0) }
    await ajax.put(`/v1/event/${params.id}`, payload).finally(() => { setUpdatingActiveStatus(false) })
    mutateEvent()
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
        <Card className="p-4 rounded-none flex flex-col items-center justify-center space-y-4">

          <div>
            <Badge className="rounded-full h-[64px] w-[64px] p-0 flex items-center justify-center bg-orange-600/20">
              <Icon className="text-white" name={eventData.icon_name || 'robot'} />
            </Badge>
          </div>

          <div className=" text-[#ccd6dc]">
            <p>{eventData.emoji} {eventData.name}</p>
          </div>

          <div className="flex items-center space-x-2">
            <Badge className="bg-[#091a2f] text-[#939ead] text-xs rounded-full h-[32px] p-2 flex items-center justify-center">
              <Pin className="w-[14px] h-[14px] mr-1 text-[#feb742]" />
              {eventData.is_pin > 0 ? '已置顶' : '未置顶'}
            </Badge>
            <Badge className="bg-[#091a2f] text-[#939ead] text-xs rounded-full h-[32px] p-2 flex items-center justify-center">
              <RefreshCw className="w-[14px] h-[14px] mr-1 text-[#feb742]" />
              {eventData.is_loop > 0 ? '循环' : '不循环'}
            </Badge>
            <Badge className="bg-[#091a2f] text-[#939ead] text-xs rounded-full h-[32px] p-2 flex items-center justify-center">
              <Ban className="w-[14px] h-[14px] mr-1 text-[#feb742]" />
              {eventData.is_active > 0 ? '已生效' : '未生效'}
            </Badge>

          </div>

        </Card>
        <section className="p-4">
          <Card className="bg-[#0a1526] p-4 space-y-2 ">
            <h1 className="flex items-center">
              <NotepadText className="mr-1" /> 记录发生时间
            </h1>
            {
              selectedEventDate
                ? (<EventDateForm key={selectedEventDate.id} defaultValues={{ event_date_id: selectedEventDate.id, happen_at: time(selectedEventDate.happen_at).date }} onSubmit={onUpdate} submiting={submiting} onCancel={onCancel} />)
                : (<EventDateForm defaultValues={{ happen_at: time().date }} onSubmit={onSubmit} submiting={submiting} />)
            }
          </Card>
        </section>

        <section className="p-4">
          <Card className="bg-[#0a1526] p-4 space-y-2 ">
            <h1 className="flex items-center">
              <History className="mr-1" /> 历史记录
            </h1>
            <ul>
              {eventDatesData && eventDatesData.map(item => (
                <li key={item.id} className="">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#ccd6dc]/50">{item.happen_at}</span>
                    <span className="space-x-2 flex justify-center items-center">
                      <p className="text-sm text-[#ccd6dc]/50">{ item.is_active ? '(最近)' : '' }</p>
                      <Button className="h-4 p-0" variant="outline" onClick={() => { setSelectedEventDate(item) }}>
                        <PencilRuler />
                      </Button>
                      <Button className="h-4 p-0" variant="outline" onClick={() => onDeleteEventDate(item.id)}>
                        <CircleX />
                      </Button>
                    </span>
                  </div>

                  {/* <p><span>id: </span>{item.id}</p>
                  <p><span>gmt_create: </span>{time(item.gmt_create).format('yyyy MM dd HH mm ss ')}</p>
                  <p><span>gmt_modified: </span>{time(item.gmt_modified).format('yyyy MM dd HH mm ss ')}</p>
                  <p><span>delete_flag: </span>{item.delete_flag}</p>
                  <p><span>is_active: </span>{item.is_active}</p>
                  <p><span>creator: </span>{item.creator}</p>
                  <p><span>events_id: </span>{item.events_id}</p>
                  <p><span>type: </span>{item.type}</p> */}

                  <Separator className="my-1" />
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <section className="p-4">
          <Card className="bg-[#0a1526] p-4 space-y-2 ">
            <h1 className="flex items-center">
              <Settings className="mr-1" /> 操作
            </h1>

            <div className="flex space-x-4">
              <Button className="flex-1" onClick={onClickEdit}>
                <FilePenLine /> 编辑
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="flex-1 bg-[#f07faf]">
                    {deleting && <Loader className="animate-spin w-4 h-4 opacity-50" />}
                    {deleting ? (<span className="opacity-50">删除中...</span>) : (<><Trash2 /> 删除</>)}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>确认删除事件 {eventData.name} 么？</AlertDialogTitle>
                    <AlertDialogDescription>删除后无法撤销，对应时间记录也无法找回，确认删除么？</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>取消</AlertDialogCancel>
                    <AlertDialogAction onClick={onClickDelete}>确认</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

            </div>

            <Button className="w-full bg-[#59c26c]" onClick={onClickTogglePin}>
              {updatingPinStatus && <Loader className="animate-spin w-4 h-4 opacity-50" />}
              {updatingPinStatus ? (<span className="opacity-50">修改中...</span>) : (<><MapPinCheck /> {eventData.is_pin ? '取消置顶' : '置顶'}</>)}
            </Button>

            <Button className="w-full bg-[#14325a] text-white" onClick={onClickToggleActive}>
              {updatingActiveStatus && <Loader className="animate-spin w-4 h-4 opacity-50" />}
              {updatingActiveStatus ? (<span className="opacity-50">修改中...</span>) : (<><Sparkles /> {eventData.is_active ? '失效' : '生效'} </>)}
            </Button>
          </Card>
        </section>

      </main>
    </>
  )
}
