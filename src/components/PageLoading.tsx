import { LoaderCircle } from 'lucide-react'

export const PageLoading: React.FC = () => {
  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-[#030a15]">
      <div className="w-[72px] h-[72px] flex items-center justify-center bg-[#14325a] rounded-lg shadow-lg">
        <LoaderCircle className="animate-spin w-[28px] h-[28px] text-[#ffb645]" />
      </div>
    </div>
  )
}
