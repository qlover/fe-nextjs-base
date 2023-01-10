import { FC, ReactNode } from 'react'

type ButtonProps = { children?: ReactNode }
const Button: FC<ButtonProps> = ({ children }) => {
  return (
    <button className="bg-secondary text-white active:bg-secondary active:opacity-70 hover:shadow-[0px_4px_8px_0px_rgba(0,0,0,0.3000)]">
      {children}
    </button>
  )
}

export default Button
