import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { getProductBySlug } from '@/api/get-product-by-slug'
import { Button } from '@/components/button'
import { FakebookBlackIcon } from '@/components/icons/facebook-black'
import { LinkedinBlackIcon } from '@/components/icons/linkedin-black'
import { SliceStar } from '@/components/icons/slice-start'
import { Star } from '@/components/icons/star'
import { TwitterBlackIcon } from '@/components/icons/twitter-black'
import { ProductSkeleton } from '@/components/product-skeleton'
import { cn } from '@/lib/utils'

export function ProductPage() {
  const productSlug = 'incredible-wooden-towels10'

  const [imageSelect, setImageSelect] = useState<{
    id: string
    title: string
    url: string
    productId: string
  }>()
  const [variantSelect, setVariantSelect] = useState<{
    id: string
    productId: string
    sizeId: string
    colorId: string
    sku: string
    quantity: number
  } | null>()

  const { data: result, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['product', productSlug],
    queryFn: async () => {
      const result = await getProductBySlug(productSlug)

      const colorIdDefault = result.product.colors[0].id
      const sizeIdDefault = result.product.sizes[0].id
      const imageSelect = result.product.images[0]

      setImageSelect(imageSelect)

      result.product.variants.forEach((variant) => {
        if (
          variant.colorId === colorIdDefault &&
          variant.sizeId === sizeIdDefault
        ) {
          setVariantSelect(variant)
        }
      })
      return result
    },
  })
  const product = result?.product

  function handleSizeId(sizeId: string) {
    if (product) {
      product.variants.forEach((variant) => {
        if (
          variant.sizeId === sizeId &&
          variantSelect?.colorId === variant.colorId
        ) {
          setVariantSelect(variant)
        }
      })
    }
  }

  function handleColorId(colorId: string) {
    if (product) {
      product.variants.forEach((variant) => {
        if (
          variant.colorId === colorId &&
          variantSelect?.sizeId === variant.sizeId
        ) {
          setVariantSelect(variant)
        }
      })
    }
  }
  if (isLoadingProducts) return <ProductSkeleton />
  return (
    <div className="6 container mx-auto flex flex-wrap lg:flex-nowrap">
      <div className="mx-auto flex flex-row  gap-4 p-4 md:flex-col  lg:mx-0 lg:w-1/6  lg:p-0">
        {product?.images.map((image) => {
          return (
            <img
              key={image.url}
              src={image.url}
              alt={image.title}
              className="h-24 w-24 cursor-pointer rounded-xl object-cover"
              onClick={() => setImageSelect(image)}
            />
          )
        })}
      </div>

      <div className="mx-auto flex w-3/4 max-w-[300px] justify-center pl-4 sm:block md:max-w-[500px] lg:max-w-[800px]">
        <img
          src={imageSelect?.url}
          alt={imageSelect?.title}
          className="h-auto w-full rounded-xl object-cover"
        />
      </div>

      <div className="mt-6 w-full pl-16">
        <h1 className="text-2xl font-bold">{product?.name}</h1>

        <p className="text-xl text-gray-800">R$ {product?.priceInCents}</p>
        <div className="mt-2 flex items-center">
          <span className="flex w-24 text-yellow-500">
            <Star />
            <Star />
            <Star />
            <Star />
            <SliceStar />
          </span>
          <span className="ml-2  border-l-2 px-4 text-gray-600">
            (20 avaliações)
          </span>
        </div>
        <p className="mt-4 text-gray-700">
          Descrição detalhada do produto aqui. É um ótimo produto com várias
          características e benefícios.
        </p>

        <div className="mt-4">
          <div className="mb-4">
            <span className="mb-2 block text-gray-700">Size:</span>
            <div className="flex space-x-4">
              {product?.sizes.map(({ id, size }) => (
                <Button
                  key={size}
                  variant="secondary"
                  className={cn(
                    'flex h-10 w-10 justify-center rounded-2xl',
                    id === variantSelect?.sizeId
                      ? ' bg-yellow-800 text-white'
                      : '',
                  )}
                  onClick={() => handleSizeId(id)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <span className="mb-2 block text-gray-700">Color:</span>
            <div className="flex space-x-4">
              {product?.colors.map(({ id, color }) => (
                <Button
                  key={id}
                  variant="secondary"
                  className={cn(
                    'h-10 w-10 rounded-full border-2 border-black',
                    id === variantSelect?.colorId
                      ? 'border-2 border-yellow-800 '
                      : 'border-2 border-black opacity-40',
                  )}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorId(id)}
                ></Button>
              ))}
            </div>
          </div>
          <div className="max-w-96">
            {variantSelect && variantSelect?.quantity > 1 && (
              <span className="mb-4 flex w-auto rounded-2xl bg-red-100 p-4 text-sm text-red-700">
                Produto Indisponível
              </span>
            )}
            <div className="mb-2">
              <label htmlFor="quantity" className="block text-gray-700">
                Quantidade:
              </label>
              <div className="mb-4 mt-2 flex items-center space-x-4">
                <div className="flex w-auto items-center rounded-2xl border-2 border-gray-500 ">
                  <button className="rounded-l-xl p-4 text-gray-700 hover:bg-yellow-900 hover:text-white">
                    -
                  </button>
                  <span className="flex w-16 justify-center">{1}</span>
                  <button className="rounded-r-xl p-4 text-gray-700 hover:bg-yellow-900 hover:text-white">
                    +
                  </button>
                </div>
                <button className="w-56 rounded-2xl border-2 border-black px-8 py-4 text-black hover:border-yellow-800 hover:bg-yellow-800 hover:text-white">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-4 border-t-2 border-gray-200 py-8 text-gray-400">
          <span>SKU: {variantSelect?.sku}</span>
          <span>Category: {product?.category.name}</span>
          <span>Tags: 123 123 123</span>
          <span className="flex gap-2 ">
            Share:
            <FakebookBlackIcon />
            <LinkedinBlackIcon />
            <TwitterBlackIcon />
          </span>
        </div>
      </div>
    </div>
  )
}
