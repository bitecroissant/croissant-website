import { PageLoading } from '@/components/PageLoading'
import { Button } from '@/components/ui/button'
import { useAuth0 } from '@auth0/auth0-react'
import { animated, useSpring } from '@react-spring/web'
import cs from 'classnames'
import { Loader, LogIn, ReceiptText } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import s from './SignInPage.module.scss'

export const SginInPage: React.FC = () => {
  const { user, isLoading: isLoadingUser, loginWithRedirect } = useAuth0()

  const springs = useSpring({
    from: { transform: 'translateY(6%)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
    config: {
      duration: 600,
    },
  })
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
      <div className="signInPageMask bg-[#ecf2fd] min-h-full bg-[url('src/assets/images/app-bg.jpg')] bg-fixed bg-no-repeat bg-cover relative overflow-x-hidden">
        <div className="loginView pt-44 min-h-[1000px]">
          <div className="loginBox w-[300px] mx-auto my-0 relative">
            <div>
              <div className="signInBox opacity-100 absolute h-full w-full">
                <div className={s.blurGradientWrapper}>
                  <div className={cs(s.conicItemWrapper, s.blur70)}>
                    <div className={cs(s.conicItem, s.conicGradientOne)}></div>
                  </div>
                  <div className={cs(s.conicItemWrapper, s.innserSize)}>
                    <div className={cs(s.conicItem, s.conicGradientTwo)}></div>
                  </div>
                  <div className={cs(s.conicItemWrapper, s.spin2, s.innserSize, 'mix-blend-overlay')}>
                    <div className={cs(s.conicItem, s.conicGradientThree)}></div>
                  </div>
                </div>
              </div>

              {/* @ts-expect-error react-spring not support react19 */}
              <animated.div key="122" style={{ ...springs }} className="flex flex-col items-center text-[#404040] opacity-70">
                <>
                  <div className="mb-8 p-8 text-[#7977d7]"><ReceiptText className="w-[120px] h-[120px]" /></div>

                  <h1 className="fonts-jinbuti py-2 text-xl font-bold">可颂笔记</h1>
                  <h2 className="text-sm mb-8"> 欢迎回来，记录生活中的美好瞬间 </h2>

                  <Button
                    className="w-full h-12 text-white rounded-full bg-gradient-to-r from-[#66b6ea] to-[#8743ff] leading-3"
                    disabled={rediecting}
                    onClick={onClickSignIn}
                  >
                    {rediecting ? <Loader className="animate-spin" /> : <LogIn className="" />}
                    {rediecting ? '正在登录...' : '登录'}
                  </Button>
                </>
              </animated.div>

            </div>
          </div>

        </div>

      </div>
    </>
  )
}
