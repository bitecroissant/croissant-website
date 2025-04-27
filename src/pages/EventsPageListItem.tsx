import { Icon } from '@/components/Icon'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { time } from '@/lib/time'
import cs from 'classnames'
import { Ban, History, Pin, RefreshCw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Props {
  item: Event
  dates: EventDate
}

export const EventsPageListItem: React.FC<Props> = ({ item, dates }) => {
  const nav = useNavigate()

  const onClickCard = (item: Event) => {
    nav(`/events/show/${item.id}`)
  }

  return (
    <Card className={cs('relative flex p-4 space-x-4')} onClick={() => { onClickCard(item) }}>
      <Badge className="rounded-full h-[52px] w-[52px] p-0 flex items-center justify-center bg-orange-600">
        <Icon className="text-white" name={item.icon_name || 'robot'} />
      </Badge>
      <div className="flex-1">
        <p>
          {item.emoji && <span>{item.emoji}</span>}
          <span className="fonts-jinbuti font-bold">{item.name}</span>
        </p>
        {dates && (
          <div className="flex items-center justify-between text-s space-x-1 text-gray-500">
            <p className="flex items-center just"><History className="h-[18px] w-[18px] mr-1" />
              {time(dates?.happen_at).isAfter(new Date()) ? '还要' : '过了'}
              大约
              {time(dates?.happen_at).calcNaturalDaysBetween(time())}
              天
            </p>
            <p>{dates?.happen_at}</p>
          </div>
        )}

      </div>

      <div className="absolute right-0 top-0 flex space-x-2 p-2">
        {item.is_pin > 0 && <Badge className="rounded-full h-[24px] w-[24px] p-0 flex items-center justify-center bg-orange-600"><Pin className="w-[14px] h-[14px] text-white" /></Badge>}
        {item.is_loop > 0 && <Badge className="rounded-full h-[24px] w-[24px] p-0 flex items-center justify-center bg-blue-600"><RefreshCw className="w-[14px] h-[14px] text-white" /></Badge>}
        {!(item.is_active > 0) && <Badge className="rounded-full h-[24px] w-[24px] p-0 flex items-center justify-center bg-red-600"><Ban className="w-[14px] h-[14px] text-white" /></Badge>}
      </div>
    </Card>
  )
}
