import { StackClientApp } from '@stackframe/react'
import { useNavigate } from 'react-router-dom'

export const stackClientApp = new StackClientApp({
  projectId: '2c1d2469-f676-43cd-8640-247ce743172d',
  publishableClientKey: 'pck_qsbxr478ejphxjcfz46r8ejj96nj61aazrjcvbprsag98',
  tokenStore: 'cookie',
  redirectMethod: {
    useNavigate,
  },
})
