import { useQuery } from '@tanstack/react-query'
import { Suspense, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getProductBySlug } from '@/api/get-product-by-slug'
import { Product } from '@/components/product'
import { ProductSkeleton } from '@/components/product-skeleton'
import { CollectionProductsSkeleton } from '@/components/products-list-skeleton'
import { RelatedProducts } from '@/components/related-products'

export function ProductPage() {
  const [showMore, setShowMore] = useState(false)
  const { productSlug } = useParams<{ productSlug: string }>()
  const { data: result, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['product', productSlug],
    queryFn: async () => {
      return await getProductBySlug(productSlug!)
    },
  })

  const product = result?.product
  return (
    <>
      <div className="mb-10 flex h-20 items-center space-x-3 bg-[#FAF3EA] px-24">
        <span>Home</span>
        <span className="text-2xl">{'>'}</span>
        <span>Shop</span>
        <span className="pr-5 text-2xl">{'>'}</span>
        <span className="border-l-2 border-gray-500 px-5"> {productSlug}</span>
      </div>
      <Product />
      <div className="mt-4 flex flex-col justify-center">
        <h1 className="flex justify-center text-2xl font-medium">
          Related Products
        </h1>
        {isLoadingProducts && <CollectionProductsSkeleton qtd={4} />}
        {product?.category && (
          <RelatedProducts category={product?.category.slug} pageIndex={1} />
        )}
        {!showMore && (
          <button
            onClick={() => setShowMore(true)}
            className="m-8 mx-auto border-2 border-yellow-900 px-16 py-2 text-yellow-900"
          >
            Show More
          </button>
        )}

        {showMore && product?.category && (
          <RelatedProducts category={product?.category.slug} pageIndex={2} />
        )}
      </div>
    </>
  )
}
