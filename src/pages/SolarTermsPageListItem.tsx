import { Separator } from '@/components/ui/separator'
import { time } from '@/lib/time'
import cs from 'classnames'
import { History } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Props {
  item: SolarTerm
  dates: EventDate
}

export const SolarTermsPageListItem: React.FC<Props> = ({ item, dates }) => {
  const nav = useNavigate()

  const onClickCard = (item: SolarTerm) => {
    nav(`/solar-terms/show/${item.id}`)
  }

  return (
    <div className={cs('relative')} onClick={() => { onClickCard(item) }}>

      <div className="flex-1">
        <p className="text-sm font-bold">
          <span>{item.index}、</span>
          {item.emoji && <span className="ml-1">{item.emoji}</span>}
          <span className="ml-1">{item.name}</span>
        </p>

        <p className="text-sm font-bold pb-4">
          <span className="ml-1">{item.en_name}</span>
        </p>

        <p className="text-sm pb-4">
          节气含义：<span className="ml-1">{item.meaning}</span>
        </p>

        <p className="text-sm pb-4">
          气象变化：<span className="ml-1">{item.meteorological_changes}</span>
        </p>

        <p className="text-sm pb-4">
          诗句：<span className="ml-1">{item.related_verses}</span>
        </p>

        <p className="text-sm pb-4">
          习俗：<span className="ml-1">{item.custom}</span>
        </p>

        <p className="text-sm pb-4">
          推荐美食：<span className="ml-1">{item.recommended_foods}</span>
        </p>

        <p className="text-sm pb-4">
          备注：<span className="ml-1">{item.addition}</span>
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
      <Separator className="my-4" />

    </div>
  )
}
