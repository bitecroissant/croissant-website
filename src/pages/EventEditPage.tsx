import type { AxiosError } from 'axios'
import type { EventsFormType } from './EventsNewPage'
import { EmptyPage } from '@/components/EmptyPage'
import { ErrorTip } from '@/components/ErrorTip'
import { PageLoading } from '@/components/PageLoading'
import { useToast } from '@/hooks/use-toast'
import { ajax } from '@/lib/ajax'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'
import { EventForm } from './EventForm'

export const EventEditPage: React.FC = () => {
  const params = useParams()
  const [submiting, setSubmiting] = useState(false)
  const { toast } = useToast()
  const nav = useNavigate()

  const { data: eventData, error, isLoading } = useSWR(params.id ? `/v1/event/${params.id}` : null, async (path) => {
    return (await ajax.get<Resource<Event>>(path)).data.resource
  })

  useEffect(() => {
    const { id } = params
    if (!id) { throw new Error('没id') }
  }, [])

  const onSubmitError = (err: AxiosError<{ error: string }>) => {
    err.response?.data && toast({ variant: 'destructive', description: err.response.data?.error })
    throw err
  }

  const onSubmit = async (values: EventsFormType) => {
    setSubmiting(true)
    await ajax.put(`/v1/event/${values.id}`, values).catch(onSubmitError).finally(() => { setSubmiting(false) })
    toast({ description: '🎉 修改成功', duration: 3000 })
    nav(-1)
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
      <div className="mt-24 min-h-[1000px]">
        {eventData && <EventForm eventData={eventData} onSubmit={onSubmit} submiting={submiting} />}
      </div>
    </>
  )
}
