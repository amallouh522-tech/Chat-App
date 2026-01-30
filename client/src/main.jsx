import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './Hooks/UserContext.jsx'
import { ServerProvider } from './Hooks/ServerContext.jsx'


createRoot(document.getElementById('root')).render(
  <UserProvider>
    <ServerProvider>
      <App />
    </ServerProvider>
  </UserProvider>,
)
