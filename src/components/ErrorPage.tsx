import { useNavigate, useRouteError } from 'react-router-dom'
import { Button } from './ui/button'

export const ErrorPage: React.FC = () => {
  const error: any = useRouteError()
  const nav = useNavigate()

  const onClickHome = () => {
    nav('/')
  }

  return (
    <div className="p-[32px] fonts-jinbuti">
      <h1 className="text-xl my-[12px] ">👻 哎呦（Oops!）</h1>
      <p className="text-lg my-[12px]">遇到了一个错误。（Sorry, an unexpected error has occurred.）</p>
      <p className="text-base my-[12px]">
        错误码: <i>{error.statusText || error.message}</i>
      </p>
      <div className="my-[12px]">
        <Button onClick={onClickHome}>带我回首页</Button>
      </div>
    </div>
  )
}
