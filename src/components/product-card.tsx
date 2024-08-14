import type { ReactNode } from 'react'

import { formatMoney } from '../ultis/formatMoney'
import { CompareIcon } from './icons/compare'
import { HeartIcon } from './icons/heart'

interface TitleProps {
  name: string
}

interface RootProps {
  children: ReactNode
}

export function Root({ children }: RootProps) {
  return (
    <div className="relative h-[446px] w-[17rem] max-w-[300px] bg-[#F4F5F7]">
      {children}
    </div>
  )
}

export function Title({ name }: TitleProps) {
  return <h2 className="text-xl">{name}</h2>
}
interface PriceOldProps {
  priceOldInCents: number
}

export function PriceOld({ priceOldInCents }: PriceOldProps) {
  const priceOldInDolar = formatMoney(priceOldInCents)

  return (
    <span className="text-xs font-medium text-gray-400 line-through">
      Rp {priceOldInDolar}
    </span>
  )
}
interface PriceProps {
  priceInCents: number
}

export function Price({ priceInCents }: PriceProps) {
  const priceInDolar = formatMoney(priceInCents)

  return <span className="mr-10 text-lg font-semibold">Rp {priceInDolar}</span>
}

interface ImageProps {
  url: string
  alt?: string
}

export function Image({ alt, url }: ImageProps) {
  return <img src={url} alt={alt} className="w-full" />
}
interface DescriptionProps {
  children: ReactNode
}

export function Description({ children }: DescriptionProps) {
  return <span className="text-gray-600">{children}</span>
}
interface ContentPriceProps {
  children: ReactNode
}

export function ContentPrice({ children }: ContentPriceProps) {
  return <div className="inline-block">{children}</div>
}
interface ContentProps {
  children: ReactNode
}

export function Content({ children }: ContentProps) {
  return <div className="m-4 flex flex-col gap-2">{children}</div>
}

export function CardHover() {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-8 bg-black bg-opacity-50 text-white opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100">
      <button className="hover:bg-color-hover cursor-pointer border bg-white px-12 py-2.5 text-lg text-[#B88E2F] transition-colors duration-300 ease-in-out">
        See Details
      </button>
      <div className="flex gap-5">
        <button className="flex cursor-pointer items-center justify-center gap-1 border-none bg-transparent text-base text-white transition-colors duration-300 ease-in-out">
          <CompareIcon />
          Share
        </button>
        <button className="flex cursor-pointer items-center justify-center gap-1 border-none bg-transparent text-base text-white transition-colors duration-300 ease-in-out">
          <CompareIcon />
          Compare
        </button>
        <button className="flex cursor-pointer items-center justify-center gap-1 border-none bg-transparent text-base text-white transition-colors duration-300 ease-in-out">
          <HeartIcon />
          Like
        </button>
      </div>
    </div>
  )
}

export function NewProduct() {
  return (
    <div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#2EC1AC] text-base text-white">
      New
    </div>
  )
}

interface DiscountProductProps {
  percentual: number
}

export function DiscountProduct({ percentual }: DiscountProductProps) {
  return (
    <div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#E97171] text-base text-white">
      -{percentual}%
    </div>
  )
}
