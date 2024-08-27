import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as Select from '@radix-ui/react-select'
import { useQuery } from '@tanstack/react-query'
import { CheckIcon, SlidersHorizontal } from 'lucide-react'
import { type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'

import { getCategories } from '@/api/get-categories'
import { getProducts } from '@/api/get-products'

import { SelectItem } from './select-item'

interface RootProps {
  children: ReactNode
}

function Root({ children }: RootProps) {
  return (
    <div className="flex h-[100px] items-center bg-tertiary">{children}</div>
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

function Categories() {
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
      prev.delete('pageIndex')
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
      prev.delete('pageIndex')
      return prev
    })
  }

  function handleCategory(slug: string) {
    if (categoriesUrl.includes(slug)) removeCategory(slug)
    else includeCategory(slug)
  }
  const categories = result?.categories

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex items-center gap-4" asChild>
        <button className="flex items-center gap-2 rounded-md px-4 py-2">
          <SlidersHorizontal className="pointer-events-none transform text-black" />
          Filter
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="mx-16 w-64 rounded-lg border-2 border-yellow-900 bg-white p-2 shadow-lg">
          <h3 className="mx-auto flex justify-center border-b-2 border-yellow-900">
            Categories
          </h3>
          {categories &&
            categories.map((category) => (
              <DropdownMenu.CheckboxItem
                key={category.name}
                className="flex cursor-pointer items-center rounded px-2 py-1.5 text-sm text-gray-700 transition-colors duration-150 hover:bg-tertiary"
                checked={categoriesUrl.includes(category.slug)}
                onCheckedChange={() => handleCategory(category.slug)}
              >
                <DropdownMenu.ItemIndicator className="mr-2">
                  <CheckIcon className="h-4 w-4 text-yellow-600" />
                </DropdownMenu.ItemIndicator>
                {category.name}
              </DropdownMenu.CheckboxItem>
            ))}
          <DropdownMenu.Arrow />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
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
  const finishiIndex = initialIndex + (result?.products.length || 16) - 1
  const totalCount = result?.meta.totalCount || 50

  return (
    <div className="flex items-center justify-center px-2">
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

  const perPageParams = Number(searchParams.get('perPage'))
  const perPage = Number(perPageParams) > 50 ? '50' : perPageParams || '16'

  const handleChange = (value: string = '16') => {
    setSearchParams((prev) => {
      prev.set('perPage', Number(value) > 50 ? String(perPage) : String(value))
      return prev
    })
  }

  return (
    <Select.Root defaultValue={String(perPage)} onValueChange={handleChange}>
      <Select.Trigger aria-label="per-page" className="space-x-4 px-4">
        <span>Show:</span>
        <div className="inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-white px-[15px] text-[15px]">
          <Select.Value defaultValue={16} placeholder="16" />
        </div>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="w-20 overflow-hidden rounded-md border-2 border-yellow-900 bg-white shadow-xl">
          <Select.Viewport className="p-[5px]">
            <Select.Group>
              <SelectItem
                className="flex cursor-pointer items-center justify-center rounded border-2 border-transparent px-2 py-1.5 text-sm text-gray-700 transition-colors duration-150 hover:border-black hover:bg-tertiary"
                value="12"
              >
                12
              </SelectItem>
              <SelectItem
                className="flex cursor-pointer items-center  justify-center rounded border-2 border-transparent px-2 py-1.5 text-sm text-gray-700 transition-colors duration-150 hover:border-black hover:bg-tertiary"
                value="16"
              >
                16
              </SelectItem>
              <SelectItem
                className="flex cursor-pointer items-center  justify-center rounded border-2 border-transparent px-2 py-1.5 text-sm text-gray-700 transition-colors duration-150 hover:border-black hover:bg-tertiary"
                value="20"
              >
                20
              </SelectItem>
              <SelectItem
                className="flex cursor-pointer items-center  justify-center rounded border-2 border-transparent px-2 py-1.5 text-sm text-gray-700 transition-colors duration-150 hover:border-black hover:bg-tertiary"
                value="24"
              >
                24
              </SelectItem>
              <SelectItem
                className="flex cursor-pointer items-center  justify-center rounded border-2 border-transparent px-2 py-1.5 text-sm text-gray-700 transition-colors duration-150 hover:border-black hover:bg-tertiary"
                value="28"
              >
                28
              </SelectItem>
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

function ShortBy() {
  const [searchParams, setSearchParams] = useSearchParams()

  const shortBy = searchParams.get('shortBy')
  const handleChange = (value: string) => {
    setSearchParams((prev) => {
      if (value === 'default') prev.delete('shortBy')
      else prev.set('shortBy', value)
      return prev
    })
  }

  return (
    <Select.Root
      defaultValue={shortBy || 'default'}
      onValueChange={handleChange}
    >
      <Select.Trigger aria-label="short-by" className="space-x-4 px-4 py-2">
        <span> Short By:</span>
        <div className="inline-flex h-[35px]  w-[160px] items-center justify-center rounded bg-white text-[15px]">
          <Select.Value defaultValue={16} placeholder="16" />
        </div>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden rounded-md border-2 border-yellow-900 bg-white shadow-xl">
          <Select.Viewport className="p-[5px]">
            <Select.Group>
              <SelectItem
                className="flex cursor-pointer items-center justify-center rounded border-2 border-transparent px-2 py-1.5 text-sm text-gray-700 transition-colors duration-150 hover:border-black hover:bg-tertiary"
                value="default"
              >
                Default
              </SelectItem>
              <SelectItem
                className="flex cursor-pointer items-center justify-center rounded border-2 border-transparent px-2 py-1.5 text-sm text-gray-700 transition-colors duration-150 hover:border-black hover:bg-tertiary"
                value="asc"
              >
                Price Ascending
              </SelectItem>
              <SelectItem
                className="flex cursor-pointer items-center justify-center rounded border-2 border-transparent px-2 py-1.5 text-sm text-gray-700 transition-colors duration-150 hover:border-black hover:bg-tertiary"
                value="desc"
              >
                Price Descending
              </SelectItem>
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

export { Root, ItemsPerPage, Categories, Content, ShowResultMeta, ShortBy }
