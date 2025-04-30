import { PageLoading } from '@/components/PageLoading'
import { Button } from '@/components/ui/button'
import { useAuth0 } from '@auth0/auth0-react'
import { Loader, LogIn } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const SginInPage: React.FC = () => {
  const { user, isLoading: isLoadingUser, loginWithRedirect } = useAuth0()
  const nav = useNavigate()

  const [rediecting, setRedirecting] = useState(false)

  const onClickSignIn = () => {
    setRedirecting(true)
    loginWithRedirect()
  }

  useEffect(() => {
    if (user?.name) {
      nav('/events')
    }
  }, [user])

  if (isLoadingUser) {
    return <PageLoading />
  }

  return (
    <>
      <h1 className="fonts-jinbuti py-2 mb-2 text-5xl text-[#c8cfcc] font-bold">可颂笔记</h1>
      <h2 className="mb-80 text-sm text-[#c8cfcc]"> 记录生活中的美好瞬间 </h2>
      <p>{JSON.stringify(user)}</p>
      <Button className="w-full h-12 text-white" disabled={rediecting} onClick={onClickSignIn}>
        {rediecting ? <Loader className="animate-spin" /> : <LogIn className="" />}
        {rediecting ? '正在登录...' : '登录'}
      </Button>
    </>
  )
}
