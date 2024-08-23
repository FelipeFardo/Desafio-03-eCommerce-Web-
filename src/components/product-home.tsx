import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { getProducts } from '@/api/get-products'

import { CollectionProducts } from './product-list'
import { CollectionProductsSkeleton } from './products-list-skeleton'

export function ProductHome() {
  const [searchParams] = useSearchParams()
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

  const products = result?.products

  return (
    <>
      <div className="mx-auto mt-10 flex max-w-[1500px] flex-wrap justify-center gap-8">
        {isLoadingProducts && <CollectionProductsSkeleton qtd={perPage} />}
        {products && <CollectionProducts products={products} />}
      </div>
    </>
  )
}
