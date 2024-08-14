import { ChevronDown, SlidersHorizontal } from 'lucide-react'
import { type ReactNode, useState } from 'react'

export type Filters =
  | 'default'
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'name-desc'

interface RootProps {
  children: ReactNode
}

function Root({ children }: RootProps) {
  return (
    <div className="mx-auto flex h-[100px] max-w-[1400px] items-center bg-[#F9F1E7]">
      {children}
    </div>
  )
}

interface ContentProps {
  children: ReactNode
}

function Content({ children }: ContentProps) {
  return (
    <div className="mx-auto flex w-[90%] flex-wrap justify-between">
      {children}
    </div>
  )
}

function FilterDetails() {
  const options = [
    { value: 'all', label: 'Filter' },
    { value: 'price-asc', label: 'Preço: Menor para Maior' },
    { value: 'price-desc', label: 'Preço: Maior para Menor' },
    { value: 'name-asc', label: 'Nome: A - Z' },
    { value: 'name-desc', label: 'Nome: Z - A' },
  ]

  return (
    <div className="flex flex-wrap items-center justify-center space-x-4">
      <div className="relative inline-block">
        <label htmlFor="filter-select" className="sr-only">
          Filter
        </label>
        <div className="relative">
          <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2  -translate-y-1/2  transform text-gray-500" />
          <select
            id="filter-select"
            className="block w-full appearance-none rounded-lg  bg-transparent py-2 pl-10 pr-8 text-base transition focus:border-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-900"
          >
            <option value="" disabled>
              Selecione um filtro
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown />
          </div>
        </div>
      </div>

      <div className="text-medim ">Showing 1-20 of 200 results</div>
    </div>
  )
}

function ItemsPerPage() {
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10)
    setItemsPerPage(value)
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
        max="100"
        value={itemsPerPage}
        onChange={handleChange}
        className="w-16 rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <CategorySelect />
    </div>
  )
}

function CategorySelect() {
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10)
    setItemsPerPage(value)
  }

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="itemsPerPage" className="text-sm ">
        Sort By:
      </label>
      <select
        id="itemsPerPage"
        name="itemsPerPage"
        value={itemsPerPage}
        onChange={handleChange}
        className="w-20 rounded-md border border-gray-300 bg-white px-2 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  )
}

export { Root, ItemsPerPage, FilterDetails, Content }
