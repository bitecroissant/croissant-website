import type { User } from '@auth0/auth0-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import { useState } from 'react'

interface Props {
  user?: User
  onClickLogout: () => void
}
export const MainLayoutHeaderUser: React.FC<Props> = (props) => {
  const { user } = props
  const [logoutBtnLoading, setLogoutBtnLoading] = useState(false)
  const _onClickLogout = () => {
    setLogoutBtnLoading(true)
    props.onClickLogout()
  }

  return (
    <div className="flex items-center">
      <Avatar>
        <AvatarImage src={user!.picture} />
        <AvatarFallback>{user!.nickname}</AvatarFallback>
      </Avatar>
      <div className="text-xs ml-1">
        <p className="">{user!.nickname}</p>
        <p className="my-1">{user!.email}</p>
      </div>
      <Button disabled={logoutBtnLoading} onClick={_onClickLogout} variant="link" className="text-[#10b981] px-2 py-1">
        { logoutBtnLoading && <Loader className="animate-spin" /> }注销
      </Button>
    </div>
  )
}
