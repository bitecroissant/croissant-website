import { GradientRedToOrangeText } from '@/components/GradientRedToOrangeText'
import { useAuth0 } from '@auth0/auth0-react'
import { MainLayoutHeaderUser } from '../layout/MainLayoutHeaderUser'

interface Props {
  title: string
  subtitle?: string
}

export const EventsPageHeader: React.FC<Props> = (props) => {
  const { title, subtitle } = props

  const { user, logout } = useAuth0()
  const onClickLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }

  return (
    <header className="fonts-jinbuti flex items-center  p-[12px]
      sticky top-0 z-[49] w-full border-emerald-100/20
      border-b bg-gradient-to-r from-emerald-50 via-teal-50/90 to-emerald-50/80
      backdrop-blur-md supports-[backdrop-filter]:bg-gradient-to-r supports-[backdrop-filter]:from-emerald-50/80 supports-[backdrop-filter]:via-teal-50/70 supports-[backdrop-filter]:to-emerald-50/60
      shadow-lg"
    >
      <div className="flex-1">
        <GradientRedToOrangeText text={title} className="flex-1 text-2xl font-bold " />
        {subtitle && <p className="text-sm text-gray-600 ">{subtitle}</p>}
      </div>

      <MainLayoutHeaderUser user={user} onClickLogout={onClickLogout} />
    </header>
  )
}
