import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from './components/Toast'
import { ModalProvider } from './components/Modal'
import App from './App.jsx'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </ModalProvider>
    </BrowserRouter>
  </StrictMode>,
)
