import type { User } from '@auth0/auth0-react'
import type { MouseEventHandler } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Loader } from 'lucide-react'
import { useState } from 'react'

interface Props {
  user?: User
  onClickLogout: () => void
}
export const MainLayoutHeaderUser: React.FC<Props> = (props) => {
  const { user } = props
  const [logoutBtnLoading, setLogoutBtnLoading] = useState(false)
  const _onClickLogout: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    setLogoutBtnLoading(true)
    props.onClickLogout()
  }

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user!.picture} />
            <AvatarFallback>{user!.nickname}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{user!.nickname}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{user!.email}</DropdownMenuItem>
          <DropdownMenuItem>
            <Button disabled={logoutBtnLoading} onClick={_onClickLogout} variant="link" className="text-[#10b981] px-2 py-1">
              {logoutBtnLoading && <Loader className="animate-spin" />}注销
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
