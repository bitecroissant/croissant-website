import { useAuth0 } from '@auth0/auth0-react'
import { ArrowLeft } from 'lucide-react'
import { MainLayoutHeaderUser } from '../layout/MainLayoutHeaderUser'

interface Props {
  title: string
  subtitle?: string
  showBack?: boolean
}

export const EventsPageHeader: React.FC<Props> = (props) => {
  const { title, showBack = false } = props

  const { user, logout } = useAuth0()
  const onClickLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }

  return (
    <header className="fonts-jinbuti flex items-center px-4 py-1
      sticky top-0 z-[49] w-full bg-[#14325a]/80 backdrop-blur-md
      shadow-lg cursor-pointer"
    >
      <div className="flex-1 flex flex-col " onClick={() => { showBack && window.history.back() }}>
        <div className="flex items-center">
          {showBack && (<ArrowLeft className="mr-1 text-red-400" />)}
          <h1 className="fonts-jinbuti flex-1 text-lg font-bold text-[#cdd9e0] ">{ title }</h1>
        </div>
      </div>

      { !showBack && <MainLayoutHeaderUser user={user} onClickLogout={onClickLogout} /> }
    </header>
  )
}
