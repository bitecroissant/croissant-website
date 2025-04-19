import { GradientRedToOrangeText } from '@/components/GradientRedToOrangeText'
import { LoadingButton } from '@/components/LoadingButton'
import { Card } from '@/components/ui/card'
import { useAuth0 } from '@auth0/auth0-react'
import { LaptopMinimalCheck } from 'lucide-react'
import { useState } from 'react'

export const SginInPage: React.FC = () => {
  const { loginWithRedirect } = useAuth0()

  const [loginBtnLoading, setLoginBtnLoading] = useState(false)

  const onClickSignIn = () => {
    setLoginBtnLoading(true)
    loginWithRedirect()
  }

  return (
    <>
      <GradientRedToOrangeText text="可颂笔记" className="mb-8 py-2 text-2xl sm:text-3xl font-bold" />
      <Card className="w-[320px] flex flex-col justify-center items-center p-[32px]">
        <Card className="w-[72px] h-[72px] flex items-center justify-center rounded-full shadow-lg">
          <LaptopMinimalCheck className="w-[32px] h-[32px] text-red-500" />
        </Card>
        <GradientRedToOrangeText text="欢迎回来" className="mt-4 mb-2 text-2xl sm:text-3xl font-bold" />

        <h2 className="mb-8 text-gray-400">
          记录生活中的美好瞬间
        </h2>

        <LoadingButton
          className="w-full rounded-full"
          text={loginBtnLoading ? '正在登录...' : '登录'}
          loading={loginBtnLoading}
          onClickButton={onClickSignIn}
        />
      </Card>
    </>
  )
}
