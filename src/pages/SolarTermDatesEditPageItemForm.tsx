import type { AxiosError } from 'axios'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useToast } from '@/hooks/use-toast'
import { ajax } from '@/lib/ajax'
import { time } from '@/lib/time'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon, Check, Loader } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { optional, z } from 'zod'

const solarTermDateSchema = z.object({
  events_id: optional(z.string()),
  happen_at: z.date(),
})

type SolarTermDateType = z.infer<typeof solarTermDateSchema>

interface Props {
  solar_term_id?: string
  happen_at?: string
}

export const SolarTermDatesEditPageItemForm: React.FC<Props> = (props) => {
  const { solar_term_id, happen_at } = props
  const { toast } = useToast()
  const form = useForm<SolarTermDateType>({
    resolver: zodResolver(solarTermDateSchema),
    defaultValues: {
      events_id: solar_term_id,
      happen_at: happen_at ? time(happen_at).date : undefined,
    },
  })

  const [submiting, setSubmiting] = useState(false)

  const onSubmitError = (err: AxiosError<{ error: string }>) => {
    err.response?.data && toast({ variant: 'destructive', description: err.code + (err.response.data?.error || '') })
    throw err
  }

  const onSubmit = async (values: SolarTermDateType) => {
    setSubmiting(true)
    await ajax.put('/v1/solar_terms_dates', values).catch(onSubmitError).finally(() => { setSubmiting(false) })
    toast({ description: '🎉 修改成功', duration: 3000 })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-1 space-x-4">
        <FormField
          control={form.control}
          name="happen_at"
          render={({ field }) => (
            <FormItem className="flex-1">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" className="flex-1 w-full pl-3 text-left font-normal ">
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
        <Button variant="outline" className=" rounded-lg flex-grow-0 text-[#21ba45]">
          {submiting ? (<Loader className="animate-spin w-4 h-4 opacity-50" />) : (<Check />)}
        </Button>
      </form>
    </Form>
  )
}
