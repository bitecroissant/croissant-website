import { useAuth0 } from '@auth0/auth0-react'
import { ReceiptText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { MainLayoutHeaderUser } from '../layout/MainLayoutHeaderUser'

export const EventsPageHeader: React.FC = () => {
  const nav = useNavigate()
  const { user, logout } = useAuth0()
  const onClickLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }

  return (
    <header className="fonts-jinbuti flex items-center px-4 py-3.5
      fixed top-0 z-[49] w-full bg-transparent backdrop-blur-md
      cursor-pointer"
    >
      <div className="flex-1 flex flex-col " onClick={() => { nav('/') }}>
        <div className="flex items-center">
          <div className="p-1 text-[#7977d7]"><ReceiptText className="w-[52px] h-[52px]" /></div>
        </div>
      </div>

      { user && <MainLayoutHeaderUser user={user} onClickLogout={onClickLogout} /> }
    </header>
  )
}
