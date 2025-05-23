import type { User } from '@auth0/auth0-react'
import type { MouseEventHandler } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Loader, LogOut, Menu } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

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
        <DropdownMenuTrigger asChild>
          <div className="p-1 text-[#404040] flex items-center ">
            <span>菜单</span><Menu className="w-[36px] h-[36px]" />
          </div>
          {/* <Avatar className="inline-flex size-[58px]">
            <AvatarImage src={user!.picture} />
            <AvatarFallback>{user!.nickname}</AvatarFallback>
          </Avatar> */}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{user!.nickname}</DropdownMenuLabel>
          <DropdownMenuItem>{user!.email}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem><Link to="/events" className="inline-flex w-full">事件</Link></DropdownMenuItem>
          <DropdownMenuItem><Link to="/solar-terms" className="inline-flex w-full">节气</Link></DropdownMenuItem>
          <DropdownMenuItem><Link to="/solar-terms/dates" className="inline-flex w-full">节气时间</Link></DropdownMenuItem>
          <DropdownMenuItem><Link to="/holidays" className="inline-flex w-full">假期</Link></DropdownMenuItem>
          <DropdownMenuItem><Link to="/poetry-lines" className="inline-flex w-full">诗句</Link></DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <span onClick={_onClickLogout} className="text-[#f07faf] inline-flex text-sm cursor-pointer">
              {logoutBtnLoading ? <Loader className="animate-spin" /> : <LogOut />}
              &nbsp;  注销
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
