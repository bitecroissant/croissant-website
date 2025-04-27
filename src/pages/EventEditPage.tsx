import type { EventsFormType } from './EventsNewPage'
import { EmptyPage } from '@/components/EmptyPage'
import { ErrorTip } from '@/components/ErrorTip'
import { EventsPageHeader } from '@/components/PageHeader'
import { PageLoading } from '@/components/PageLoading'
import { Card } from '@/components/ui/card'
import { ajax } from '@/lib/ajax'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { EventForm } from './EventForm'

export const EventEditPage: React.FC = () => {
  const params = useParams()

  const { data: eventData, error, isLoading } = useSWR(params.id ? `/v1/event/${params.id}` : null, async (path) => {
    return (await ajax.get<Resource<Event>>(path)).data.resource
  })

  const [submiting, setSubmiting] = useState(false)

  useEffect(() => {
    const { id } = params
    if (!id) { throw new Error('没id') }
  }, [])

  const onSubmit = async (values: EventsFormType) => {
    setSubmiting(true)
    await ajax.put(`/v1/event/${values.id}`, values).finally(() => { setSubmiting(false) })
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
      <EventsPageHeader title="编辑" showBack={true} />

      <Card>
        {eventData && <EventForm eventData={eventData} onSubmit={onSubmit} submiting={submiting} />}
      </Card>

    </>
  )
}
