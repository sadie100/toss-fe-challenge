import type { ComponentType, ReactNode } from 'react'
import { useModalController } from './ModalController'

export type ModalClose<T> = (value: T | null) => void

export type ModalComponent<T, P = {}> = ComponentType<
  P & { close: ModalClose<T> }
>

export const useOpenModal = () => {
  const { open } = useModalController()

  return function openModal<T, P = {}>(
    Component: ModalComponent<T, P>,
    props?: P
  ): Promise<T | null> {
    return open<T>((close) => <Component {...(props as P)} close={close} />)
  }
}

export default useOpenModal
