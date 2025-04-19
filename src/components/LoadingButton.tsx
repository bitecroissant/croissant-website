import cs from 'classnames'
import { Loader } from 'lucide-react'
import { Button } from './ui/button'

interface Props {
  className?: string
  loading: boolean
  onClickButton: () => void
  text: string
}

export const LoadingButton: React.FC<Props> = (props) => {
  const { className, loading, onClickButton, text } = props
  return (
    <Button
      className={cs('', className)}
      disabled={loading}
      onClick={onClickButton}
    >
      {loading && <Loader className="animate-spin" />}
      {text}
    </Button>
  )
}
