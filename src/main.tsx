import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'

const div = document.getElementById('root')
const root = createRoot(div!)

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
