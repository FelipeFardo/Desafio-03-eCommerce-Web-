import * as Select from '@radix-ui/react-select'
import { CheckIcon } from 'lucide-react'
import React from 'react'

import { cn } from '@/lib/utils'

interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof Select.Item> {
  children: React.ReactNode
  className?: string
}

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={cn(
          'relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[15px] leading-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none',
          className,
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 inline-flex w-[20px] items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    )
  },
)
SelectItem.displayName = 'SelectItem'
