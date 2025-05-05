import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
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
    <div className={cs('relative')} onClick={() => { onClickCard(item) }}>

      <div className="flex-1">
        <p className="text-sm font-bold pb-4">
          {item.emoji && <span>{item.emoji}</span>}
          <span className="ml-1">{item.name}</span>
        </p>
        {dates
          ? (
              <div className="mt-2 flex items-center justify-between text-xs space-x-1">
                <p className="flex items-center justify-center ">
                  <History className="h-[18px] w-[18px] mr-1" />
                  {time(dates?.happen_at).isAfter(new Date()) ? '还要' : '过了'}
                  大约
                  {time(dates?.happen_at).calcNaturalDaysBetween(time())}
                  天
                </p>
                <p>{dates?.happen_at}</p>
              </div>
            )
          : (
              <div className="mt-2 flex items-center justify-between text-xs space-x-1">
                <p className="flex items-center justify-center ">
                  🙏 暂无记录
                </p>
              </div>
            )}

      </div>

      <div className="absolute right-0 top-0 flex space-x-2">
        {item.is_pin > 0 && <Badge className="rounded-full h-[24px] w-[24px] p-0 flex items-center justify-center bg-[#fbbd08]/50 shadow-lg"><Pin className="w-[14px] h-[14px] text-white" /></Badge>}
        {item.is_loop > 0 && <Badge className="rounded-full h-[24px] w-[24px] p-0 flex items-center justify-center bg-[#468498]/50 shadow-lg"><RefreshCw className="w-[14px] h-[14px] text-white" /></Badge>}
        {!(item.is_active > 0) && <Badge className="rounded-full h-[24px] w-[24px] p-0 flex items-center justify-center bg-[#598ef0]/50 shadow-lg"><Ban className="w-[14px] h-[14px] text-white" /></Badge>}
      </div>

      <Separator className="my-4" />
    </div>
  )
}
