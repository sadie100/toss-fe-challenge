import { useState } from 'react'
import useOpenModal from './modal/useOpenModal'
import AccountForm from './AccountForm'
import AnimalForm from './AnimalForm'

const blocks = [...Array(40)].map((_, i) => i + 1)

const ModalFormPage = () => {
  const openModal = useOpenModal()

  const handleAccountOpen = async () => {
    const result = await openModal(AccountForm)
    console.log('modal result', result)
  }

  const handleAnimalOpen = async () => {
    const result = await openModal(AnimalForm)
    console.log('modal result', result)
  }

  return (
    <div>
      <header>
        <h1>접근성 친화 모달 데모</h1>
        <button
          type="button"
          aria-haspopup="dialog"
          onClick={handleAccountOpen}
        >
          계정 모달 열기
        </button>
        <button type="button" aria-haspopup="dialog" onClick={handleAnimalOpen}>
          동물 모달 열기
        </button>
      </header>

      <main>
        {blocks.map((index: number) => (
          <section key={index} aria-label={`콘텐츠 블록 ${index + 1}`}>
            <h2>콘텐츠 블록 {index + 1}</h2>
            <p>
              이 블록은 데모용 더미 콘텐츠입니다. 스크롤바가 나타날 수 있도록
              여러 개의 블록을 렌더링합니다.
            </p>
          </section>
        ))}
      </main>
    </div>
  )
}

export default ModalFormPage
