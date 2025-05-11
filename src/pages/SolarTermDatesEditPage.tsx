import { EmptyPage } from '@/components/EmptyPage'
import { ErrorTip } from '@/components/ErrorTip'
import { PageLoading } from '@/components/PageLoading'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { ajax } from '@/lib/ajax'
import useSWR from 'swr'
import { SolarTermDatesEditPageItemForm } from './SolarTermDatesEditPageItemForm'

export const SolarTermDatesEditPage: React.FC = () => {
  const { data: solarTerms, error: solarTermError, isLoading: solarTermLoading } = useSWR('/v1/solar_terms', async (path) => {
    return (await ajax.get<Resources<SolartTermWithDates>>(path)).data.resources
  })

  if (solarTermLoading) { return (<PageLoading />) }

  if (solarTermError) { return (<ErrorTip />) }

  if (!solarTerms) { return (<EmptyPage />) }

  return (
    <>
      <main className="mt-24 p-4 min-h-[1000px] ">
        <div className="p-4 rounded-none">

          <ScrollArea className="h-[600px] my-4">
            <ol>
              {
                solarTerms?.map(({ solar_terms, event_dates }) =>
                  (
                    <>
                      <li className="flex items-center space-x-4 px-3 py-1" key={solar_terms.id}>
                        <span className="w-[7rem]">{solar_terms.index}、{solar_terms.emoji} &nbsp; {solar_terms.name}</span>
                        <span className="flex-1 flex items-center">
                          <SolarTermDatesEditPageItemForm solar_term_id={solar_terms.id} happen_at={event_dates?.happen_at} />
                        </span>
                      </li>
                      <Separator className="my-2" />
                    </>
                  ),
                )
              }
            </ol>
          </ScrollArea>
        </div>
      </main>

    </>
  )
}
