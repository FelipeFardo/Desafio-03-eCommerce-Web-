import { useQuery } from '@tanstack/react-query'

import { getProducts } from '@/api/get-products'

import { CollectionProducts } from './product-list'
import { CollectionProductsSkeleton } from './products-list-skeleton'

interface RelatedProductsProps {
  category: string
  pageIndex: number
  perPage: number
}
export function RelatedProducts({
  category,
  pageIndex,
  perPage,
}: RelatedProductsProps) {
  const { data: result, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['productsByCategory', category, pageIndex, perPage],
    queryFn: async () => {
      return await getProducts({
        categories: category,
        pageIndex,
        perPage,
      })
    },
  })

  const products = result?.products

  return (
    <>
      {isLoadingProducts && <CollectionProductsSkeleton qtd={perPage} />}
      {products && <CollectionProducts productVariants={result?.products} />}
    </>
  )
}
