import { Icon } from '@/components/Icon'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import cs from 'classnames'
import { Ban, History, Pin, RefreshCw } from 'lucide-react'

interface Props {
  item: Event
}
export const EventsPageListItem: React.FC<Props> = ({ item }) => {
  return (
    <Card className={cs('relative flex p-4 space-x-4')}>
      <Badge className="rounded-full h-[52px] w-[52px] p-0 flex items-center justify-center bg-orange-600">
        <Icon className="text-white" name={item.icon_name || 'robot'} />
      </Badge>
      <div className="flex-1">
        <p>
          {item.emoji && <span>{item.emoji}</span>}
          <span className="fonts-jinbuti font-bold">{item.name}</span>
        </p>
        <div className="flex items-center justify-between text-s space-x-1 text-gray-500">
          <p className="flex items-center just"><History className="h-[18px] w-[18px] mr-1" /> 过了大约 239999 天</p>
          <p>2025-12-31</p>
        </div>
      </div>

      <div className="absolute right-0 top-0 flex space-x-2 p-2">
        {item.is_pin > 0 && <Badge className="rounded-full h-[24px] w-[24px] p-0 flex items-center justify-center bg-orange-600"><Pin className="w-[14px] h-[14px] text-white" /></Badge>}
        {item.is_loop > 0 && <Badge className="rounded-full h-[24px] w-[24px] p-0 flex items-center justify-center bg-blue-600"><RefreshCw className="w-[14px] h-[14px] text-white" /></Badge>}
        {!(item.is_active > 0) && <Badge className="rounded-full h-[24px] w-[24px] p-0 flex items-center justify-center bg-red-600"><Ban className="w-[14px] h-[14px] text-white" /></Badge>}
      </div>
    </Card>
  )
}
