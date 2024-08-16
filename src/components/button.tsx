import clsx from 'clsx'
import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'link'
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  className,
  children,
  ...props
}) => {
  const baseStyles = 'font-medium rounded'

  const variantStyles = {
    primary: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500',
    secondary:
      'bg-[#F9F1E7] text-black hover:bg-yellow-800 hover:text-white focus:ring-yellow-800',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    link: 'bg-tranparent text-black',
  }

  const sizeStyles = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
