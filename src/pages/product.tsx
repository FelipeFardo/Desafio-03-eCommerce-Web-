import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { getProductBySlug } from '@/api/get-product-by-slug'
import { Product } from '@/components/product'
import { CollectionProductsSkeleton } from '@/components/products-list-skeleton'
import { RelatedProducts } from '@/components/related-products'

export function ProductPage() {
  const [showMore, setShowMore] = useState(false)
  const navigate = useNavigate()

  const { productSlug } = useParams<{ productSlug: string }>()
  const { data: result, isLoading: isLoadingProduct } = useQuery({
    queryKey: ['product', productSlug],
    queryFn: async () => {
      return await getProductBySlug(productSlug!)
    },
  })

  const product = result?.product
  return (
    <>
      <div className="mb-10 flex h-20 items-center space-x-3 bg-tertiary px-8 md:px-24">
        <span>Home</span>
        <span className="text-2xl">{'>'}</span>
        <span>Shop</span>
        <span className="pr-5 text-2xl">{'>'}</span>
        <span className="border-l-2 border-gray-500 px-5"> {productSlug}</span>
      </div>
      <Product />
      <div className="mb-16 mt-4 flex flex-col justify-center ">
        <h1 className="flex justify-center text-2xl font-medium">
          Related Products
        </h1>
        <div className="mx-auto mt-10 flex max-w-[1400px] flex-wrap justify-center gap-8">
          {isLoadingProduct && <CollectionProductsSkeleton qtd={4} />}
          {product?.category && (
            <RelatedProducts
              pageIndex={1}
              category={product?.category.slug}
              perPage={4}
            />
          )}
          {showMore && product?.category && (
            <RelatedProducts
              pageIndex={2}
              category={product?.category.slug}
              perPage={4}
            />
          )}
        </div>
        {!showMore && (
          <button
            onClick={() => setShowMore(true)}
            className="m-8 mx-auto w-56 rounded-2xl border-2 border-black  px-16   py-2 text-black hover:border-yellow-800 hover:bg-yellow-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-black disabled:hover:bg-transparent disabled:hover:text-black"
          >
            Show More
          </button>
        )}

        {showMore && product?.category && (
          <button
            onClick={() => {
              navigate(`/?categories=${product?.category.slug}`)
              window.scrollTo(0, 0)
            }}
            className="m-8 mx-auto w-56 rounded-2xl border-2 border-black  px-16   py-2 text-black hover:border-yellow-800 hover:bg-yellow-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-black disabled:hover:bg-transparent disabled:hover:text-black"
          >
            Show More
          </button>
        )}
      </div>
    </>
  )
}
