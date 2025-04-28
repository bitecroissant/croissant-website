import { FolderOpen } from 'lucide-react'

export const EmptyPage: React.FC = () => {
  return (
    <div className="pt-16 flex flex-col items-center justify-center">
      <FolderOpen className="w-[64px] h-[64px] text-gray-700 opacity-50" />
      <h1 className="text-m mt-4 text-gray-700">🙌🏻 您还没有创建任何事件</h1>
    </div>
  )
}
