import { LampDesk } from 'lucide-react'
import { useState } from 'react'
import { LoadingButton } from './LoadingButton'

export const ErrorTip: React.FC = () => {
  const [loading, setLoading] = useState(false)

  return (
    <div className="mt-24 pt-16 flex flex-col items-center justify-center">
      <LampDesk className="w-[64px] h-[64px] text-gray-700" />
      <h1 className="text-m mt-4 text-gray-700">系统开小差了,请刷新页面重试...</h1>
      <LoadingButton loading={loading} text="刷新" onClickButton={() => { setLoading(true); window.location.reload() }} className="mt-4 rounded-full" />
    </div>
  )
}
