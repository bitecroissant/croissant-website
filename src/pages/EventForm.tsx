import type { MouseEventHandler } from 'react'
import type { EventsFormType } from './EventsNewPage'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { eventsFormSchema } from './EventsNewPage'

interface Props {
  eventData?: Event
  onSubmit: (values: EventsFormType) => Promise<void>
  submiting: boolean
}

const defaultEventFormData = {
  name: '',
  is_loop: true,
  is_pin: false,
  emoji: '',
  icon_name: '',
  icon_color: '',
  is_active: true,
}

const transferEvent: (eventData: Event | undefined) => EventsFormType = (eventData) => {
  if (!eventData) { return defaultEventFormData }
  return {
    ...eventData,
    is_active: eventData.is_active > 0,
    is_loop: eventData.is_loop > 0,
    is_pin: eventData.is_pin > 0,
  } as EventsFormType
}

export const EventForm: React.FC<Props> = (props) => {
  const nav = useNavigate()

  const { eventData, onSubmit, submiting } = props
  const form = useForm<EventsFormType>({
    resolver: zodResolver(eventsFormSchema),
    defaultValues: transferEvent(eventData),
  })

  const onCancel: MouseEventHandler<HTMLButtonElement> = (ev) => {
    ev.preventDefault()
    nav(-1)
  }

  return (
    <div className="m-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>事件名称</FormLabel>
                  <FormControl>
                    <Input placeholder="输入事件名称，比如：理发" className="border-black/20" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            control={form.control}
            name="is_loop"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-row items-center justify-between">
                  <FormLabel>是否循环</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            control={form.control}
            name="is_pin"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-row items-center justify-between">
                  <FormLabel>是否置顶</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            control={form.control}
            name="emoji"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>emoji</FormLabel>
                  <FormControl>
                    <Input placeholder="比如：🥗" className="border-black/20" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            control={form.control}
            name="icon_name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>图标名称</FormLabel>
                  <FormControl>
                    <Input placeholder="比如：loading" className="border-black/20" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            control={form.control}
            name="icon_color"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>图标颜色</FormLabel>
                  <FormControl>
                    <Input placeholder="比如：#ccc" className="border-black/20" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            control={form.control}
            name="is_active"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-row items-center justify-between">
                  <FormLabel>是否生效</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <div className="mt-4">
            {eventData
              ? (
                  <>
                    <Button disabled={submiting} type="submit" className="w-full mt-8">
                      {submiting && <Loader className="animate-spin" />} 保存
                    </Button>

                    <Button onClick={onCancel} className="w-full mt-8" variant="outline">
                      取消
                    </Button>
                  </>
                )
              : (
                  <Button disabled={submiting} type="submit" className="w-full mt-8">
                    {submiting && <Loader className="animate-spin" />} 提交
                  </Button>
                )}
          </div>

        </form>
      </Form>
    </div>
  )
}
