import type { CSSProperties } from 'react'

const blocks = [...Array(40)].map((_, i) => i + 1)

const ModalFormPage = () => {
  return (
    <div>
      <header>
        <h1>접근성 친화 모달 데모</h1>
        <button type="button" aria-haspopup="dialog" aria-expanded={false}>
          모달 열기
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
