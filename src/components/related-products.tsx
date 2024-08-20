import { useQuery } from '@tanstack/react-query'

import { getProducts } from '@/api/get-products'

import { CollectionProducts } from './product-list'
import { CollectionProductsSkeleton } from './products-list-skeleton'

interface RelatedProductsProps {
  category: string
  pageIndex: number
}
export function RelatedProducts({ category, pageIndex }: RelatedProductsProps) {
  const { data: result, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['productsByCategory', category, pageIndex],
    queryFn: async () => {
      return await getProducts({
        categories: category,
        perPage: 4,
        pageIndex,
      })
    },
  })

  const products = result?.products

  return (
    <>
      {isLoadingProducts && <CollectionProductsSkeleton qtd={4} />}
      {products && <CollectionProducts products={result?.products} />}
    </>
  )
}
