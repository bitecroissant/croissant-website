import { Loader } from 'lucide-react'
import { Card } from './ui/card'

export const PageLoading: React.FC = () => {
  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Card className="w-[72px] h-[72px] flex items-center justify-center shadow-lg">
        <Loader className="animate-spin w-[28px] h-[28px] text-[#e11d48]" />
      </Card>
    </div>
  )
}
