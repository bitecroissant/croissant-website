import type { AxiosError } from 'axios'
import { useToast } from '@/hooks/use-toast'
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
  const { toast } = useToast()

  const onSubmitError = (err: AxiosError<{ error: string }>) => {
    err.response?.data && toast({ variant: 'destructive', description: err.response.data?.error })
    throw err
  }

  async function onSubmit(values: EventsFormType) {
    setSubmiting(true)
    await ajax.post('/v1/event', values).catch(onSubmitError).finally(() => { setSubmiting(false) })
    toast({ description: '🎉 创建成功', duration: 3000 })
  }

  return (
    <>
      <div className="mt-24 min-h-[1000px]">
        <EventForm onSubmit={onSubmit} submiting={submiting} />
      </div>
    </>
  )
}
