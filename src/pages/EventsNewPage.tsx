import { EventsPageHeader } from '@/components/PageHeader'
import { ajax } from '@/lib/ajax'
import { useState } from 'react'
import { optional, z } from 'zod'
import { EventForm } from './EventForm'

export const eventsFormSchema = z.object({
  id: optional(z.string()),
  name: z.string().min(2, { message: '名称至少两个字符' }).max(24, { message: '名称最多24个字符' }),
  is_loop: z.boolean(),
  is_pin: z.boolean(),
  emoji: z.string(),
  icon_name: z.string(),
  icon_color: z.string(),
  is_active: z.boolean(),
})

export type EventsFormType = z.infer<typeof eventsFormSchema>

export const EventsNewPage: React.FC = () => {
  const [submiting, setSubmiting] = useState(false)

  async function onSubmit(values: EventsFormType) {
    setSubmiting(true)
    await ajax.post('/v1/event', values).finally(() => { setSubmiting(false) })
  }

  return (
    <>
      <EventsPageHeader title="创建新事件" showBack={true} />

      <EventForm onSubmit={onSubmit} submiting={submiting} />
    </>
  )
}
