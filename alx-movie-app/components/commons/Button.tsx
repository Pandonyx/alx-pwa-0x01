import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', ...props }) => {
  const base = 'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition'
  const palette = {
    primary: 'bg-black text-white hover:opacity-90',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    ghost: 'bg-transparent text-gray-900 hover:bg-gray-100'
  } as const

  return (
    <button className={`${base} ${palette[variant]} ${className}`} {...props} />
  )
}

export default Button