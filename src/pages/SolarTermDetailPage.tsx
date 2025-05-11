import type { AxiosError } from 'axios'
import { EmptyPage } from '@/components/EmptyPage'
import { ErrorTip } from '@/components/ErrorTip'
import { PageLoading } from '@/components/PageLoading'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { ajax } from '@/lib/ajax'
import { FilePenLine, FlagTriangleRight, Loader, Settings, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'

export const SolarTermDetailPage: React.FC = () => {
  const nav = useNavigate()
  const params = useParams()
  const { toast } = useToast()

  const { data: resource, error, isLoading } = useSWR(params.id ? `/v1/solar_term/${params.id}` : null, async (path) => {
    return (await ajax.get<Resource<SolarTerm>>(path)).data.resource
  })

  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const { id } = params
    if (!id) { throw new Error('没id') }
  }, [])

  const onClickEdit = () => {
    resource && nav(`/solar-terms/edit/${resource.id}`)
  }

  const onDeleteError = (err: AxiosError<{ error: string }>) => {
    err.response?.data && toast({ variant: 'destructive', description: err.code + (err.response.data?.error || '') })
    throw err
  }

  const onClickDelete = async () => {
    setDeleting(true)
    await ajax.delete(`/v1/solar_term/${params.id}`).catch(onDeleteError).finally(() => { setDeleting(false) })
    toast({ title: '事件删除成功', description: `${resource?.name} 被删除啦`, action: (<ToastAction altText="我晓得了">我晓得了</ToastAction>) })
    nav('/solar-terms')
  }

  if (isLoading) {
    return (<PageLoading />)
  }

  if (error) {
    return (<ErrorTip />)
  }

  if (!resource) {
    return (<EmptyPage />)
  }

  return (
    <>
      <main className="mt-24 p-4 min-h-[1000px] space-y-4">
        <div className="p-4 rounded-none space-y-4">
          <div className="flex-1">
            <p className="text-sm font-bold">
              <span>{resource.index}、</span>
              {resource.emoji && <span className="ml-1">{resource.emoji}</span>}
              <span className="ml-1">{resource.name}</span>
            </p>

            <p className="text-sm font-bold pb-4">
              <span className="ml-1">{resource.en_name}</span>
            </p>

            <p className="text-sm pb-4">
              节气含义：<span className="ml-1">{resource.meaning}</span>
            </p>

            <p className="text-sm pb-4">
              气象变化：<span className="ml-1">{resource.meteorological_changes}</span>
            </p>

            <p className="text-sm pb-4">
              诗句：<span className="ml-1">{resource.related_verses}</span>
            </p>

            <p className="text-sm pb-4">
              习俗：<span className="ml-1">{resource.custom}</span>
            </p>

            <p className="text-sm pb-4">
              推荐美食：<span className="ml-1">{resource.recommended_foods}</span>
            </p>

            <p className="text-sm pb-4">
              备注：<span className="ml-1">{resource.addition}</span>
            </p>

          </div>
          <Separator className="my-4" />
        </div>
        <div className="mt-24 p-4 max-w-[700px] mx-auto bg-white rounded shadow-xl">

          <section className="">
            <div className="space-y-4 ">
              <h1 className="flex items-center">
                <Settings className="mr-1" /> 操作
              </h1>

              <div className="flex space-x-4">
                <Button className="flex-1" onClick={onClickEdit}>
                  <FilePenLine /> 编辑
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="flex-1 bg-[#f07faf]">
                      {deleting && <Loader className="animate-spin w-4 h-4 opacity-50" />}
                      {deleting ? (<span className="opacity-50">删除中...</span>) : (<><Trash2 /> 删除</>)}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>确认删除事件 {resource.name} 么？</AlertDialogTitle>
                      <AlertDialogDescription>删除后无法撤销，对应时间记录也无法找回，确认删除么？</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>取消</AlertDialogCancel>
                      <AlertDialogAction onClick={onClickDelete}>确认</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button className="flex-1" onClick={() => { nav('/solar-terms/dates') }}>
                  <FlagTriangleRight /> 节气时间
                </Button>
              </div>
            </div>
            <Separator className="my-4" />
          </section>
        </div>
      </main>
    </>
  )
}
