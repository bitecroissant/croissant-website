import { EmptyPage } from '@/components/EmptyPage'
import { ErrorTip } from '@/components/ErrorTip'
import { PageLoading } from '@/components/PageLoading'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ajax } from '@/lib/ajax'
import { useAuth0 } from '@auth0/auth0-react'
import { Plus } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import { SolarTermsPageListItem } from './SolarTermsPageListItem'

export const SolarTermsPage: React.FC = () => {
  const { data: resourcesData, error: resourcesError, isLoading: resourcesLoading } = useSWR(
    '/v1/solar_terms',
    async path => (await ajax.get<Resources<SolartTermWithDates>>(path)).data.resources,
  )

  const { isLoading: isLoadingToken, isAuthenticated, getAccessTokenSilently } = useAuth0()

  const setJwt = async () => {
    const jwt = await getAccessTokenSilently()
    const savedJwt = window.localStorage.getItem('jwt') || ''
    if (jwt && jwt !== savedJwt) {
      window.localStorage.setItem('jwt', jwt)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      setJwt()
    }
  }, [isAuthenticated])

  const nav = useNavigate()

  const onClickNew = () => {
    nav('/solar-terms/new')
  }

  if (isLoadingToken) {
    return <PageLoading />
  }

  if (resourcesLoading) {
    return <PageLoading />
  }

  const handleRender = () => {
    if (resourcesData && resourcesData.length > 0) {
      if (!resourcesError) {
        return (
          <div className="mt-24 max-w-[700px] mx-auto space-y-2 p-4">
            <h1 className="text-center text-4xl pb-7">24 节气</h1>
            <ScrollArea className="h-[800px]">
              <ol className=" space-y-4 bg-white rounded shadow-xl p-4 ">
                {resourcesData.map(({ solar_terms: resource, event_dates }) => (
                  <li className="" key={resource.id}>
                    <SolarTermsPageListItem item={resource} dates={event_dates} />
                  </li>
                ))}
              </ol>
            </ScrollArea>
            {resourcesError && (<p className="pt-24">系统开小差了,请刷新页面重试...</p>)}
          </div>
        )
      }
    }
    else {
      if (!resourcesError) {
        return (<EmptyPage />)
      }
      else {
        return (<ErrorTip />)
      }
    }
  }

  return (
    <>
      {handleRender()}
      <Button onClick={onClickNew} className="fixed right-[5%] top-[70%] rounded-full w-[56px] h-[56px] shadow-lg [&_svg]:size-8">
        <Plus />
      </Button>
    </>
  )
}
