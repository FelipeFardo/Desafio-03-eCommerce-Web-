import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface RootProps {
  children: ReactNode
}

function Root({ children }: RootProps) {
  return (
    <div className="relative mx-auto grid h-[300px] max-w-[1400px] place-items-center overflow-hidden">
      {children}
    </div>
  )
}

interface DescriptionProps extends React.HTMLProps<HTMLHeadingElement> {
  children: ReactNode
}

function Description({ children, className, ...props }: DescriptionProps) {
  return (
    <div
      className={cn(
        'relative flex h-full w-full items-center justify-center text-center text-base text-black',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface ImageProps {
  imageUrl: string
}

function Image({ imageUrl }: ImageProps) {
  return (
    <div
      className="absolute h-full w-full bg-cover bg-center blur-sm"
      style={{ backgroundImage: `url(${imageUrl})` }}
    />
  )
}

interface ContentProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode
}

function Content({ children, className, ...props }: ContentProps) {
  return (
    <div className={cn('flex flex-col justify-center', className)} {...props}>
      {children}
    </div>
  )
}

interface TitleProps {
  children: ReactNode
}

function Title({ children }: TitleProps) {
  return (
    <div className="relative flex h-full w-full items-center justify-center text-center text-5xl font-semibold text-black">
      {children}
    </div>
  )
}

export { Root, Image, Title, Description, Content }
