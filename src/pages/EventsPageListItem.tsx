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
    <Card className={cs('relative flex px-2 py-4 space-x-4')} onClick={() => { onClickCard(item) }}>

      <div className="flex-1 ">
        <p className="text-base text-[#ccd6dc]">
          {item.emoji && <span>{item.emoji}</span>}
          <span className="ml-1">{item.name}</span>
        </p>
        {dates && (
          <div className="mt-2 flex items-center justify-between text-xs space-x-1 text-[#ccd6dc]/50">
            <p className="flex items-center justify-center ">
              <History className="h-[18px] w-[18px] mr-1" />
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
