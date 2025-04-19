import { EventsPageHeader } from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { ajax } from '@/lib/ajax'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const eventsFormSchema = z.object({
  name: z.string().min(2, { message: '名称至少两个字符' }).max(24, { message: '名称最多24个字符' }),
  is_loop: z.boolean(),
  is_pin: z.boolean(),
  emoji: z.string(),
  icon_name: z.string(),
  icon_color: z.string(),
  is_active: z.boolean(),
})

type eventsFormType = z.infer<typeof eventsFormSchema>

export const EventsNewPage: React.FC = () => {
  const [isSubmitBtnLoading, setIsSubmitBtnLoading] = useState(false)
  const form = useForm<eventsFormType>({
    resolver: zodResolver(eventsFormSchema),
    defaultValues: {
      name: '',
      is_loop: true,
      is_pin: false,
      emoji: '',
      icon_name: '',
      icon_color: '',
      is_active: true,
    },
  })

  async function onSubmit(values: eventsFormType) {
    setIsSubmitBtnLoading(true)
    await ajax.post('/v1/event', values).finally(() => {
      setIsSubmitBtnLoading(false)
    })
  }

  return (
    <div className=" ">
      <EventsPageHeader title="创建新事件" showBack={true} />

      <div className="min-h-screen rounded-lg px-6 shadow-lg pt-6 pb-32">
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

            <Button disabled={isSubmitBtnLoading} type="submit" className="w-full mt-8">
              {isSubmitBtnLoading && <Loader className="animate-spin" />} 提交
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
