import { PoetryLineLayout } from '@/layout/PoetryLineLayout'

export const poetryLinesRoutes = {
  path: 'poetry-lines',
  element: <PoetryLineLayout />,
  children: [
    { index: true, element: '诗句列表' },
    { path: 'edit/:id', element: '' },
    { path: 'show/:id', element: '' },
  ],
}
