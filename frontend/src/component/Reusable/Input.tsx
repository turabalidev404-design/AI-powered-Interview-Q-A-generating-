import type React from "react"

interface InputProps {
  Type: string
  Name: string
  Value?: string
  Placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({
  Type,
  Name,
  Value,
  Placeholder,
  onChange,
}: InputProps) => {

  return (
    <>
      <input
        type={Type}
        name={Name}
        value={Value}
        placeholder={Placeholder}
        onChange={onChange}
      />
    </>
  )
}

export default Input