import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/app/app'
// Entrypoint defines fonts, if any
import '@/assets/entrypoint.css'
// font files should also be imported from assets

// index.html guarantees the presence of <div id="root">
// mark it non-null with !
const rootElement = document.getElementById('root')!

const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
