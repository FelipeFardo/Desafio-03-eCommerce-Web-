import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { getProducts } from '@/api/get-products'
import * as Pagination from '@/components/pagination'

export function PaginationHome() {
  const [searchParams, setSearchParams] = useSearchParams()
  const pageIndex = Number(searchParams.get('pageIndex') || 1)
  const perPage = Number(searchParams.get('perPage') || 16)
  const shortByParam = searchParams.get('shortBy')

  const shortBy: 'asc' | 'desc' | 'default' =
    shortByParam === 'asc' || shortByParam === 'desc' ? shortByParam : 'default'

  const categories = searchParams.get('categories') || null

  const { data: result, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products', pageIndex, perPage, categories, shortBy],
    queryFn: () =>
      getProducts({
        perPage,
        pageIndex,
        categories,
        shortBy,
      }),
  })

  function handlePage(page: number) {
    if (page < 0) return
    setSearchParams((prev) => {
      prev.set('pageIndex', String(page))
      return prev
    })
  }

  const pages = Math.ceil(result?.meta.totalCount || 50 / perPage) || 1

  return (
    <>
      {isLoadingProducts && (
        <Pagination.Root>
          <Pagination.Button>1</Pagination.Button>
          <Pagination.Button active={true}>2</Pagination.Button>
          <Pagination.Button>3</Pagination.Button>
          <Pagination.Next />
        </Pagination.Root>
      )}
      {result && (
        <Pagination.Root>
          <Pagination.Button
            disabled={pageIndex === 1}
            onClick={() => handlePage(pageIndex - 1)}
          >
            {pageIndex - 1}
          </Pagination.Button>
          <Pagination.Button active={true}>{pageIndex}</Pagination.Button>
          <Pagination.Button
            disabled={pages <= pageIndex + 1}
            onClick={() => handlePage(pageIndex + 1)}
          >
            {pageIndex + 1}
          </Pagination.Button>
          <Pagination.Next
            disabled={pages <= pageIndex + 1}
            onClick={() => handlePage(pageIndex + 1)}
          />
        </Pagination.Root>
      )}
    </>
  )
}
