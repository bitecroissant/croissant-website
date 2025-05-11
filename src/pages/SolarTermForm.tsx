import type { ChangeEvent, MouseEventHandler } from 'react'
import type { ControllerRenderProps } from 'react-hook-form'
import type { SolarTermsFormType } from './SolarTermsNewPage'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { solarTermsFormSchema } from './SolarTermsNewPage'

interface Props {
  resource?: SolarTerm
  onSubmit: (values: SolarTermsFormType) => Promise<void>
  submiting: boolean
}

export const SolarTermForm: React.FC<Props> = (props) => {
  const nav = useNavigate()

  const { resource, onSubmit, submiting } = props

  const form = useForm<SolarTermsFormType>({
    resolver: zodResolver(solarTermsFormSchema),
    defaultValues: resource || {},
  })

  const onCancel: MouseEventHandler<HTMLButtonElement> = (ev) => {
    ev.preventDefault()
    nav(-1)
  }

  const onIndexChange = (e: ChangeEvent<HTMLInputElement>, field: ControllerRenderProps<SolarTermsFormType>) => {
    const value = e.target.value
    // 如果输入为空，设置为 null
    if (value === '') {
      field.onChange(null)
    }
    else {
      // 尝试将输入转换为数字
      const numValue = Number.parseInt(value, 10)
      // 如果转换成功，更新值为数字类型
      if (!Number.isNaN(numValue)) {
        field.onChange(numValue)
      }
      else {
        field.onChange(null)
      }
    }
  }

  return (
    <div className="m-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="index"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>节气位置</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1~24" className="border-black/20" {...field} onChange={e => onIndexChange(e, field)} />
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
                <FormItem className="flex flex-col ">
                  <FormLabel>emoji</FormLabel>
                  <FormControl>
                    <Input placeholder="🌱" className="border-black/20" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>节气名称</FormLabel>
                  <FormControl>
                    <Input placeholder="立春" className="border-black/20" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            control={form.control}
            name="en_name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>英文名</FormLabel>
                  <FormControl>
                    <Input placeholder="比如：the Beginning of Spring" className="border-black/20" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            control={form.control}
            name="meaning"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>节气含义</FormLabel>
                  <FormControl>
                    <Textarea rows={6} placeholder="立春不仅是农历二十四节气中的第一个节气，立春是从天文上来划分的，而在自然界、在人们的心目中，春意味着风和日暖，鸟语花香;春也意味着万物生长，农家播种。立春节气一般是从2月4日或5日开始，到2月19或20日结束。有时在农历的腊月，有时在农历的正月" className="border-black/20" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            control={form.control}
            name="meteorological_changes"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>气象变化</FormLabel>
                  <FormControl>
                    <Textarea rows={6} placeholder="比如：谓春季开始之节气" className="border-black/20" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            control={form.control}
            name="related_verses"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>相关诗句</FormLabel>
                  <FormControl>
                    <Textarea rows={6} placeholder="比如：东风带雨逐西风，大地阳和暖气生。万物苏萌山水醒，农家岁首又谋耕" className="border-black/20" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            control={form.control}
            name="custom"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>习俗</FormLabel>
                  <FormControl>
                    <Textarea rows={6} placeholder="比如：立春后，人们在春暖花开的日子里，喜欢外出游春，俗称出城探春、踏春，是古代春游的主要形式" className="border-black/20" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            control={form.control}
            name="recommended_foods"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>推荐美食</FormLabel>
                  <FormControl>
                    <Textarea rows={6} placeholder="比如：立春时的食品主要是春饼、萝卜、五辛盘等，在南方则流行吃春卷。又比如美食:春盘--主要是蔬菜取生菜瓜果饼糖放盘中为春盘（或拼成盘）馈送亲友或自食取迎春之意。盘里主要有：果品、蔬菜、糖果、饼、饵五种。蔬菜主要有：豆芽、萝卜、韭菜、菠菜、生菜、豆子、鸡蛋、土豆丝。这也是立春的美食之一。" className="border-black/20" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            control={form.control}
            name="addition"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>备注</FormLabel>
                  <FormControl>
                    <Textarea rows={6} placeholder="比如：立春后是疾病多发的季节。春天的多发病有肺炎、肝炎、流脑、麻疹、腮腺炎、过敏性哮喘、心肌梗塞、精神病等。因此对于有肝炎、过敏性哮喘、心肌梗塞等的患者要特别注意调养预防。在养生上主要是护肝。在作息时间上，人们也应顺应自然界的规律，早睡早起。在精神养生方面，要力戒暴怒，更忌忧郁，做到心胸开阔，保持心境愉悦。立春之后的一段时间往往冷暖不定，要当心“倒春寒”的侵扰，特别是对于体弱的人来说，感冒、发烧是常有的事情。对此专家表示，要想杀菌并防寒，在饮食上可增加吃大蒜、洋葱、芹菜等“味冲”食物的次数，对预防伤寒感冒等春季多发的呼吸道感染大有益处。" className="border-black/20" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <div className="mt-4">
            {resource
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
