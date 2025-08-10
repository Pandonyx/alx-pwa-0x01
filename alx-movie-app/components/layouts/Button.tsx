import React from 'react'

type LayoutButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<LayoutButtonProps> = ({ className = '', ...props }) => {
  return (
    <button className={`rounded-xl border px-4 py-2 text-sm hover:bg-gray-50 ${className}`} {...props} />
  )
}

export default Button