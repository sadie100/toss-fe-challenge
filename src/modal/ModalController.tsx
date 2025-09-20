import { createContext, useCallback, useContext, useState } from 'react'
import { useRef as useDomRef } from 'react'

type Resolver<T> = (value: T | PromiseLike<T>) => void

type ActiveModalState<T> = {
  render: (close: (value: T | null) => void) => React.ReactNode
  resolve: Resolver<T | null>
}

type ModalControllerContextValue = {
  open: <T>(
    render: (close: (value: T | null) => void) => React.ReactNode
  ) => Promise<T | null>
}

const ModalControllerContext =
  createContext<ModalControllerContextValue | null>(null)

export const useModalController = (): ModalControllerContextValue => {
  const ctx = useContext(ModalControllerContext)
  if (!ctx) throw new Error('ModalControllerProvider가 필요합니다.')
  return ctx
}

export const ModalControllerProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [active, setActive] = useState<ActiveModalState<any> | null>(null)
  const dialogRef = useDomRef<HTMLDialogElement | null>(null)

  const open = useCallback<ModalControllerContextValue['open']>(
    (render) => {
      return new Promise((resolve) => {
        setActive({ render, resolve })
        const dialog = dialogRef.current
        if (dialog && !dialog.open) {
          // Lock background scroll
          document.body.style.overflow = 'hidden'

          dialog.showModal()
        }
      })
    },
    [active]
  )

  const close = useCallback(
    <T,>(value: T | null) => {
      if (!active) return
      try {
        active.resolve(value)
      } finally {
        setActive(null)
        const dialog = dialogRef.current
        if (dialog && dialog.open) {
          dialog.close()
        }
        // Unlock background scroll
        document.body.style.overflow = ''
      }
    },
    [active]
  )

  return (
    <ModalControllerContext.Provider value={{ open }}>
      {children}
      {/* Host 영역: 단일 dialog를 항상 렌더하고, 콘텐츠만 교체 */}
      <dialog
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        onClick={(e) => {
          //모달 바깥 눌렀을때 닫기
          if (e.target === e.currentTarget) {
            close(null)
          }
        }}
        style={{
          minHeight: '50px',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onCancel={() => {
          close(null)
        }}
      >
        {active ? active.render((v) => close(v)) : null}
      </dialog>
    </ModalControllerContext.Provider>
  )
}

export default ModalControllerProvider
