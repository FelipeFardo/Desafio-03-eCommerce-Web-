import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useQuery } from '@tanstack/react-query'
import { CheckIcon, SlidersHorizontal } from 'lucide-react'
import { type ReactNode } from 'react'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

import { getCategories } from '@/api/get-categories'
import { getProducts } from '@/api/get-products'

interface RootProps {
  children: ReactNode
}

function Root({ children }: RootProps) {
  return (
    <div className="flex h-[100px] items-center  bg-[#F9F1E7]">{children}</div>
  )
}

interface ContentProps {
  children: ReactNode
}

function Content({ children }: ContentProps) {
  return (
    <div className="mx-auto flex w-[90%] flex-wrap justify-center gap-3 lg:justify-between ">
      {children}
    </div>
  )
}

function FilterDetails() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoriesUrl = searchParams.get('categories')?.split(',') || []

  const { data: result } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  })
  function includeCategory(slug: string) {
    setSearchParams((prev) => {
      const categories = prev.get('categories')?.split(',') || []
      categories.push(slug)
      const newCategories = categories.join(',')
      prev.set('categories', newCategories)
      return prev
    })
  }

  function removeCategory(slug: string) {
    setSearchParams((prev) => {
      const categories = prev.get('categories')?.split(',')
      if (!categories) return prev
      const newCategories = categories.filter((category) => category !== slug)
      if (newCategories.length === 0) prev.delete('categories')
      else prev.set('categories', newCategories.join(','))
      return prev
    })
  }
  function handleCategory(slug: string) {
    if (categoriesUrl.includes(slug)) removeCategory(slug)
    else includeCategory(slug)
  }
  const categories = result?.categories

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="flex items-center gap-4">
          <SlidersHorizontal className="  pointer-events-none  transform text-gray-500 " />
          Filter
          <ShowResultMeta />
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="mx-16 border-2 border-yellow-900 bg-white p-4">
            <DropdownMenu.Group>
              {categories &&
                categories.map((category) => (
                  <DropdownMenu.CheckboxItem
                    key={category.name}
                    className="text-violet  data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 text-md relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] leading-none outline-none data-[disabled]:pointer-events-none"
                    checked={categoriesUrl.includes(category.slug)}
                    onCheckedChange={() => handleCategory(category.slug)}
                  >
                    <DropdownMenu.ItemIndicator className="absolute left-0 inline-flex w-[20px] items-center justify-center">
                      <CheckIcon />
                    </DropdownMenu.ItemIndicator>
                    {category.name}
                  </DropdownMenu.CheckboxItem>
                ))}
            </DropdownMenu.Group>
            <DropdownMenu.Arrow />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  )
}

function ShowResultMeta() {
  const [searchParams] = useSearchParams()
  const pageIndex = Number(searchParams.get('pageIndex') || 1)
  const perPage = Number(searchParams.get('perPage') || 16)
  const shortByParam = searchParams.get('shortBy')

  const shortBy: 'asc' | 'desc' | 'default' =
    shortByParam === 'asc' || shortByParam === 'desc' ? shortByParam : 'default'

  const categories = searchParams.get('categories') || null

  const { data: result } = useQuery({
    queryKey: ['products', pageIndex, perPage, categories, shortBy],
    queryFn: () =>
      getProducts({
        perPage,
        pageIndex,
        categories,
        shortBy,
      }),
  })

  const initialIndex = (pageIndex - 1) * perPage + 1
  const finishiIndex = initialIndex + (result?.products.length || 16 - 2)
  const totalCount = result?.meta.totalCount

  return (
    <div className="flex items-center  border-l-2 border-gray-400 px-4">
      Showing
      <span className="px-1">{initialIndex}</span>-
      <span className="px-1">{finishiIndex}</span>
      of
      <span className="px-1">{totalCount} results</span>
    </div>
  )
}

function ItemsPerPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const perPage =
    Number(searchParams.get('perPage')) > 50
      ? '50'
      : searchParams.get('perPage') || '16'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 1
    if (value > 50) {
      setSearchParams((prev) => {
        prev.set('perPage', perPage)
        return prev
      })
    } else {
      setSearchParams((prev) => {
        prev.set('perPage', String(value))
        return prev
      })
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="itemsPerPage" className="text-sm">
        Show:
      </label>
      <input
        type="number"
        id="itemsPerPage"
        name="itemsPerPage"
        min="1"
        max="50"
        value={perPage || 16}
        onChange={handleChange}
        className="w-16 rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ShortBy />
    </div>
  )
}

function ShortBy() {
  const [searchParams, setSearchParams] = useSearchParams()

  const shortBy = searchParams.get('shortBy')
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value

    setSearchParams((prev) => {
      console.log(value)
      if (value === 'default') prev.delete('shortBy')
      else prev.set('shortBy', value)
      return prev
    })
  }
  return (
    <div className="flex items-center space-x-3">
      <label htmlFor="shortBy" className="text-sm text-gray-700">
        Sort By:
      </label>
      <select
        id="shortBy"
        name="shortBy"
        value={shortBy || 'default'}
        onChange={handleChange}
        className="w-44 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm transition duration-150 ease-in-out focus:border-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-900"
      >
        <option value="default">Default</option>
        <option value="asc">Price Ascending</option>
        <option value="desc">Price Descending</option>
      </select>
    </div>
  )
}

export { Root, ItemsPerPage, FilterDetails, Content }
