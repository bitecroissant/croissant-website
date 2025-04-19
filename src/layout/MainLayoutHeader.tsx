import { Button } from '@/components/ui/button'
import { useAuth0 } from '@auth0/auth0-react'
import { Loader } from 'lucide-react'
import { useState } from 'react'
import { MainLayoutHeaderUser } from './MainLayoutHeaderUser'

export const MainLayoutHeader: React.FC = () => {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0()

  const [loginBtnLoading, setLoginBtnLoading] = useState(true)

  const onClickSignIn = () => {
    setLoginBtnLoading(true)
    loginWithRedirect()
  }

  const onClickLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }

  return (
    <header className="flex items-center h-[80px] p-[12px]
      sticky top-0 w-full z-[49]
      fonts-jinbuti
      border-b border-emerald-100/20
      bg-gradient-to-r from-emerald-50 via-teal-50/90 to-emerald-50/80 backdrop-blur-md
      supports-[backdrop-filter]:bg-gradient-to-r supports-[backdrop-filter]:from-emerald-50/80 supports-[backdrop-filter]:via-teal-50/70 supports-[backdrop-filter]:to-emerald-50/60"
    >
      <p className="flex-1 text-2xl
        font-bold bg-gradient-to-r from-red-400 via-orange-500 to-red-600 bg-clip-text text-transparent"
      >可颂笔记
      </p>

      {
        (isAuthenticated
          ? (<MainLayoutHeaderUser user={user} onClickLogout={onClickLogout} />)
          : (
              <Button
                className="bg-[#10b981] hover:bg-[#10b981]/90"
                disabled={loginBtnLoading}
                onClick={onClickSignIn}
              >
                { loginBtnLoading && <Loader className="animate-spin" /> }登录
              </Button>
            )
        )
      }
    </header>
  )
}
