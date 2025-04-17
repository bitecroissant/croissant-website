import cs from 'classnames'
import s from './Icon.module.scss'

interface Props {
  className?: string
  name: string
}

export const Icon: React.FC<Props> = (props) => {
  const { className, name } = props
  return (
    <svg className={cs(className, s.icon)}>
      <use xlinkHref={`#${name}`}></use>
    </svg>
  )
}
