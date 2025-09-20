import 'modern-normalize'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ModalFormPage from './ModalFormPage'
import { ModalControllerProvider } from './modal/ModalController'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModalControllerProvider>
      <ModalFormPage />
    </ModalControllerProvider>
  </StrictMode>
)
