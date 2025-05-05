import type { MouseEventHandler } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { time } from '@/lib/time'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon, CalendarPlus, Loader, Save, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { optional, z } from 'zod'

const eventsDatesSchema = z.object({
  event_date_id: optional(z.string()),
  happen_at: z.date(),
})

export type EventsDatesType = z.infer<typeof eventsDatesSchema>

interface Props {
  defaultValues: EventsDatesType
  submiting: boolean
  onSubmit: (values: EventsDatesType) => Promise<void>
  onCancel?: MouseEventHandler<HTMLButtonElement>
}

export const EventDateForm: React.FC<Props> = (props) => {
  const { defaultValues, submiting, onSubmit } = props
  const form = useForm<EventsDatesType>({
    resolver: zodResolver(eventsDatesSchema),
    defaultValues,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="happen_at"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" className="w-full pl-3 text-left font-normal ">
                      {field.value ? (time(field.value).format()) : (<span>选择日期</span>)}
                      <CalendarIcon className="ml-auto w-4 h-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar selected={field.value} onSelect={field.onChange} disabled={date => date > time().add(1, 'month').date || date < new Date('1900-01-01')} mode="single" initialFocus />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        {defaultValues.event_date_id
          ? (
              <>
                <Button className="rounded-lg w-full">
                  {submiting && <Loader className="animate-spin w-4 h-4 opacity-50" />}
                  {submiting ? (<span className="opacity-50">记录中...</span>) : (<><Save /> 修改</>)}
                </Button>
                <Button onClick={(ev) => { props.onCancel?.(ev) }} variant="outline" className="rounded-lg w-full bg-[#14325a]"><X />取消</Button>
              </>
            )
          : (
              <Button className="rounded-lg w-full">
                {submiting && <Loader className="animate-spin w-4 h-4 opacity-50" />}
                {submiting ? (<span className="opacity-50">记录中...</span>) : (<><CalendarPlus /> 记录发生时间</>)}
              </Button>
            )}
      </form>
    </Form>
  )
}
