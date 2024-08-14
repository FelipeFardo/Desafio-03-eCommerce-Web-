import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
}

interface NumberedButtonProps extends BaseButtonProps {
  active?: boolean
}

const BaseButton = ({ className, children, ...props }: BaseButtonProps) => (
  <button
    className={cn(
      'cursor-pointer rounded-[10px] border-none bg-[#F9F1E7] text-base text-black hover:bg-[#B88E2F] hover:text-white',
      className,
    )}
    {...props}
  >
    {children}
  </button>
)

const Button = ({ active, children, ...props }: NumberedButtonProps) => (
  <BaseButton
    className={cn('h-12 w-12', active && 'bg-[#B88E2F] text-white')}
    {...props}
  >
    {children}
  </BaseButton>
)

const Next = (props: BaseButtonProps) => (
  <BaseButton className="h-15 w-24" {...props}>
    Next
  </BaseButton>
)

const Root = ({ children }: { children: ReactNode }) => (
  <div className="h-25 mt-10 flex justify-center gap-8">{children}</div>
)

export { Root, Button, Next }
