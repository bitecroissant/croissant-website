import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import './index.scss'

const div = document.getElementById('root')
const root = createRoot(div!)
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
