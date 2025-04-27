import type { LucideProps } from 'lucide-react'
import { Milk, PartyPopper, PersonStanding, Sun } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { SiteNavItem } from './SiteNavItem'

import { Card } from './ui/card'

export interface NavItem {
  to: string
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
  title: string
}

const navItems: NavItem[] = [
  { to: '/events', icon: PersonStanding, title: '事件' },
  { to: '/events/new', icon: PersonStanding, title: '新增事件' },
  { to: '/solar-terms', icon: Sun, title: '节气' },
  { to: '/poetry-lines', icon: Milk, title: '诗句' },
  { to: '/holidays', icon: PartyPopper, title: '节日' },
]

export const SiteNav: React.FC = () => {
  const location = useLocation()
  const { pathname } = location

  return (
    <Card className="fixed bottom-8 left-2 shadow-lg rounded-full flex px-6 py-2 space-x-8">
      {navItems.map(item => (
        <SiteNavItem key={item.to} item={item} currentPath={pathname} />
      ))}
    </Card>
  )
}
