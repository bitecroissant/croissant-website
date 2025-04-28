import { Button } from '@/components/ui/button'
import { useAuth0 } from '@auth0/auth0-react'
import { Loader, LogIn } from 'lucide-react'
import { useState } from 'react'

export const SginInPage: React.FC = () => {
  const { loginWithRedirect } = useAuth0()

  const [loading, setLoading] = useState(false)

  const onClickSignIn = () => {
    setLoading(true)
    loginWithRedirect()
  }

  return (
    <>
      <h1 className="fonts-jinbuti py-2 mb-2 text-5xl text-[#c8cfcc] font-bold">可颂笔记</h1>
      <h2 className="mb-80 text-sm text-[#c8cfcc]"> 记录生活中的美好瞬间 </h2>
      <Button className="w-full h-12 text-white" disabled={loading} onClick={onClickSignIn}>
        {loading ? <Loader className="animate-spin" /> : <LogIn className="" />}
        {loading ? '正在登录...' : '登录'}
      </Button>
    </>
  )
}
