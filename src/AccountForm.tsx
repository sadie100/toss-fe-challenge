import type { FormEventHandler } from 'react'

export type FormModalValues = {
  fullName: string
  email: string
}

export type FormModalContentProps = {
  initialValues?: Partial<FormModalValues>
  close: (values: FormModalValues | null) => void
}

const AccountForm = ({ initialValues, close }: FormModalContentProps) => {
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    close({
      fullName: String(data.get('fullName') ?? ''),
      email: String(data.get('email') ?? ''),
    })
  }

  return (
    <form
      method="dialog"
      onSubmit={onSubmit}
      style={{ minWidth: 320, maxWidth: '90vw' }}
    >
      <h2 style={{ margin: '0 0 1rem' }}>정보 입력</h2>
      <div style={{ display: 'grid', gap: '.75rem' }}>
        <label htmlFor="fullName">이름</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          defaultValue={initialValues?.fullName ?? ''}
          required
          autoFocus
        />
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={initialValues?.email ?? ''}
          required
        />
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

export default AccountForm
