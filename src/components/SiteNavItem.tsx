import type { NavItem } from './SiteNav'
import cs from 'classnames'
import { createElement } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  item: NavItem
  currentPath: string
}
export const SiteNavItem: React.FC<Props> = ({ item, currentPath }) => {
  const isActive = currentPath.startsWith(item.to)
  const activeColor = '#e11d48'
  const inactiveColor = 'text-gray-500'

  return (

    <Link to={item.to} className={cs('flex flex-col py-1 px-2 rounded-xl border-none ', isActive && 'bg-[#e11d48]/30')}>
      {/* <PersonStanding className={cs("w-[32px] h-[32px] ", currentPath.indexOf("/events") > -1 ? "text-[#e11d48]" : "text-gray-500")} /> */}
      { createElement(item.icon, { className: cs('w-[32px] h-[32px] ', isActive ? activeColor : inactiveColor) }) }
      <p className={cs('mt-1 text-[14px]', isActive ? activeColor : inactiveColor)}>{ item.title }</p>
    </Link>
  )
}
