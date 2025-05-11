import type { AxiosError } from 'axios'
import { useToast } from '@/hooks/use-toast'
import { ajax } from '@/lib/ajax'
import { useState } from 'react'
import { optional, z } from 'zod'
import { SolarTermForm } from './SolarTermForm'

export const solarTermsFormSchema = z.object({
  id: optional(z.string()),
  index: z.number().int().min(1).max(24),
  emoji: z.string(),
  name: z.string().min(2, { message: '名称至少两个字符' }).max(24, { message: '名称最多24个字符' }),
  en_name: z.string(),
  meaning: z.string(),
  meteorological_changes: z.string(),
  related_verses: z.string(),
  custom: z.string(),
  recommended_foods: z.string(),
  addition: z.string(),
})

export type SolarTermsFormType = z.infer<typeof solarTermsFormSchema>

export const SolarTermsNewPage: React.FC = () => {
  const [submiting, setSubmiting] = useState(false)
  const { toast } = useToast()

  const onSubmitError = (err: AxiosError<{ error: string }>) => {
    err.response?.data && toast({ variant: 'destructive', description: err.response.data?.error })
    throw err
  }

  async function onSubmit(values: SolarTermsFormType) {
    setSubmiting(true)
    await ajax.post('/v1/solar_term', values).catch(onSubmitError).finally(() => { setSubmiting(false) })
    toast({ description: '🎉 创建成功', duration: 3000 })
  }

  return (
    <>
      <div className="mt-24 min-h-[1000px]">
        <SolarTermForm onSubmit={onSubmit} submiting={submiting} />
      </div>
    </>
  )
}
