import cs from 'classnames'

interface Props {
  text: string
  className?: string
}
export const GradientRedToOrangeText: React.FC<Props> = (props) => {
  return (
    <h1 className={cs('fonts-jinbuti bg-gradient-to-r from-red-400 via-orange-500 to-red-600 text-transparent bg-clip-text', props.className)}>{props.text}</h1>
  )
}
