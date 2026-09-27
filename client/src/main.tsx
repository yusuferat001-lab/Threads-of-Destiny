import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { HataSinirlayici } from './components/HataSinirlayici.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HataSinirlayici>
      <App />
    </HataSinirlayici>
  </StrictMode>,
)
