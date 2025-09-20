import type { FormEventHandler } from 'react'

export type FormModalValues = {
  name: string
  age: number
}

export type FormModalContentProps = {
  initialValues?: Partial<FormModalValues>
  close: (values: FormModalValues | null) => void
}

const AnimalForm = ({ initialValues, close }: FormModalContentProps) => {
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    close({
      name: String(data.get('name') ?? ''),
      age: Number(data.get('age') ?? ''),
    })
  }

  return (
    <form
      method="dialog"
      onSubmit={onSubmit}
      style={{ minWidth: 320, maxWidth: '90vw' }}
    >
      <h2 style={{ margin: '0 0 1rem' }}>동물 정보 입력</h2>
      <div style={{ display: 'grid', gap: '.75rem' }}>
        <label htmlFor="name">동물 이름</label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={initialValues?.name ?? ''}
          required
          autoFocus
        />
        <label htmlFor="age">동물 나이</label>
        <input
          id="age"
          name="age"
          type="number"
          defaultValue={initialValues?.age ?? ''}
          required
        />
        {new Array(100).fill(0).map((_, index) => (
          <p key={index}>동물은 정말 귀엽습니다. 스크롤용 내용 채우기입니다.</p>
        ))}
        <div
          style={{
            display: 'flex',
            gap: '.5rem',
            justifyContent: 'flex-end',
            marginTop: '1rem',
          }}
        >
          <button type="button" onClick={() => close(null)}>
            취소
          </button>
          <button type="submit">제출</button>
        </div>
      </div>
    </form>
  )
}

export default AnimalForm
