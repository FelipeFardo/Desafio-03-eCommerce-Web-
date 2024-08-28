import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'

import { getProductBySlug } from '@/api/get-product-by-slug'
import { addToCart } from '@/cart/cart-slice'
import { Button } from '@/components/button'
import { FakebookBlackIcon } from '@/components/icons/facebook-black'
import { LinkedinBlackIcon } from '@/components/icons/linkedin-black'
import { SliceStar } from '@/components/icons/slice-start'
import { Star } from '@/components/icons/star'
import { TwitterBlackIcon } from '@/components/icons/twitter-black'
import { ProductImages } from '@/components/product-images'
import { useSheetCart } from '@/contexts/sheet-cart'
import { cn } from '@/lib/utils'
import { formatMoney } from '@/utis/formatMoney'
import { sorteSizes } from '@/utis/sorte-sizes'

import { ProductSkeleton } from './product-skeleton'

export function Product() {
  const { productSlug } = useParams<{ productSlug: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const skuSearchParams = searchParams.get('sku')
  const dispatch = useDispatch()
  const { openSheetCart } = useSheetCart()

  const [variantSelect, setVariantSelect] = useState<{
    id: string
    productId: string
    priceInCents: number
    oldPriceInCents: number | null
    discount: number | null
    sizeId: string
    size: string
    isNew: boolean
    sizeName: string
    colorId: string
    hexCode: string
    colorName: string
    sku: string
    quantity: number
  } | null>()
  const [qtdToCart, setQtdToCart] = useState(1)

  function increment() {
    setQtdToCart((e) => e + 1)
  }

  function decrement() {
    setQtdToCart((e) => e - 1 || 1)
  }

  const { data: result, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['product', productSlug],
    queryFn: async () => {
      const result = await getProductBySlug(productSlug!)

      const colorDefault = result.product.colors[0]
      const sizeDefault = result.product.sizes[0]

      result.product.variants.forEach((variant) => {
        if (!skuSearchParams) {
          if (
            variant.colorId === colorDefault.id &&
            variant.sizeId === sizeDefault.id
          ) {
            setVariantSelect({
              ...variant,
              hexCode: colorDefault.hexCode,
              colorName: colorDefault.name,
              size: sizeDefault.size,
              sizeName: sizeDefault.name,
            })
            return
          }
        }

        if (skuSearchParams === variant.sku) {
          const colorSelect = result.product.colors.filter(
            (color) => color.id === variant.colorId,
          )[0]
          const sizeSelect = result.product.sizes.filter(
            (size) => size.id === variant.sizeId,
          )[0]
          setVariantSelect({
            ...variant,
            hexCode: colorSelect.hexCode,
            colorName: colorSelect.name,
            size: sizeSelect.size,
            sizeName: sizeSelect.name,
          })
        }
      })
      return result
    },
  })

  useEffect(() => {
    if (result) {
      result.product.variants.forEach((variant) => {
        if (skuSearchParams) {
          if (skuSearchParams === variant.sku) {
            const colorSelect = result.product.colors.filter(
              (color) => color.id === variant.colorId,
            )[0]
            const sizeSelect = result.product.sizes.filter(
              (size) => size.id === variant.sizeId,
            )[0]
            setVariantSelect({
              ...variant,
              priceInCents: variant.priceInCents,
              isNew: variant.isNew,
              oldPriceInCents: variant.oldPriceInCents,
              discount: variant.discount,
              hexCode: colorSelect.hexCode,
              colorName: colorSelect.name,
              size: sizeSelect.size,
              sizeName: sizeSelect.name,
            })
          }
        }
      })
    }
    setQtdToCart(1)
  }, [skuSearchParams, result])

  if (isLoadingProducts) return <ProductSkeleton />

  const product = result?.product

  const handleAddItem = () => {
    if (product && variantSelect) {
      dispatch(
        addToCart({
          productSlug: productSlug!,
          imageUrl: product?.images[0].url,
          quantityAvailable: variantSelect.quantity,
          name: product?.name,
          hexCode: variantSelect.hexCode,
          colorName: variantSelect.colorName,
          size: variantSelect.size,
          sizeName: variantSelect.sizeName,
          priceInCents: variantSelect?.priceInCents,
          quantity: qtdToCart,
          sku: variantSelect?.sku,
        }),
      )
      openSheetCart()
    }
  }

  function handleSizeId(sizeId: string, size: string, sizeName: string) {
    if (product) {
      product.variants.forEach((variant) => {
        if (
          variant.sizeId === sizeId &&
          variantSelect?.colorId === variant.colorId
        ) {
          setSearchParams((prev) => {
            prev.set('sku', variant.sku)
            return prev
          })
          setVariantSelect({
            ...variant,
            size,
            hexCode: variantSelect.hexCode,
            colorName: variantSelect.colorName,
            sizeName,
          })
        }
      })
    }
  }

  function handleColorId(colorId: string, hexCode: string, colorName: string) {
    if (product) {
      product.variants.forEach((variant) => {
        if (
          variant.colorId === colorId &&
          variantSelect?.sizeId === variant.sizeId
        ) {
          setSearchParams((prev) => {
            prev.set('sku', variant.sku)
            return prev
          })
          setVariantSelect({
            ...variant,
            hexCode,
            size: variantSelect.size,
            sizeName: variantSelect.sizeName,
            colorName,
          })
        }
      })
    }
  }

  const qtdNoAvailable =
    (variantSelect && qtdToCart > variantSelect?.quantity) || false

  return (
    <div className="6 container mx-auto flex flex-wrap lg:flex-nowrap">
      {product && <ProductImages images={product?.images} />}
      <div className="mt-6 w-full pl-16">
        <div className="flex space-x-2">
          <h1 className="text-2xl font-bold">{product?.name}</h1>
          {variantSelect?.isNew && (
            <span className="font-bold text-green-600">New</span>
          )}
        </div>

        <div className="flex space-x-16">
          <p className="text-xl text-gray-800">
            Rp{' '}
            {variantSelect?.priceInCents &&
              formatMoney(variantSelect?.priceInCents)}
          </p>
          <div className="flex items-end space-x-2 text-sm font-medium">
            <span className="text-gray-400  line-through">
              {variantSelect?.oldPriceInCents &&
                formatMoney(variantSelect?.oldPriceInCents)}
            </span>
            {variantSelect?.discount && (
              <span className="text-red-500">- {variantSelect?.discount}%</span>
            )}
          </div>
        </div>

        <div className="mt-2 flex items-center">
          <span className="flex w-24 text-yellow-500">
            <Star />
            <Star />
            <Star />
            <Star />
            <SliceStar />
          </span>
          <span className="ml-2  border-l-2 px-4 text-gray-600">
            5 Customer Review
          </span>
        </div>
        <p className="mt-4 text-gray-700">{product?.description}</p>

        <div className="mt-4">
          <div className="mb-4">
            <span className="mb-2 block text-gray-700">Size:</span>
            <div className="flex space-x-4">
              {sorteSizes(product?.sizes || []).map(({ id, size, name }) => (
                <Button
                  key={size}
                  variant="secondary"
                  className={cn(
                    'flex h-10 w-10 justify-center rounded-2xl',
                    id === variantSelect?.sizeId
                      ? ' bg-yellow-800 text-white'
                      : '',
                  )}
                  onClick={() => handleSizeId(id, size, name)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <span className="mb-2 block text-gray-700">Color:</span>
            <div className="flex space-x-4">
              {product?.colors.map(({ id, hexCode, name }) => (
                <Button
                  key={id}
                  variant="secondary"
                  className={cn(
                    'h-10 w-10 rounded-full border-2 border-black',
                    id === variantSelect?.colorId
                      ? 'border-2 border-yellow-800 '
                      : 'border-2 border-black opacity-40',
                  )}
                  style={{ backgroundColor: hexCode }}
                  onClick={() => handleColorId(id, hexCode, name)}
                ></Button>
              ))}
            </div>
          </div>
          <div className="max-w-96">
            {qtdNoAvailable && (
              <span className="mb-4 flex w-auto rounded-2xl bg-red-100 p-4 text-sm text-red-700">
                Quantity not available
              </span>
            )}
            <div className="my-8">
              <div className="mb-4 mt-2 flex items-center space-x-4">
                <div className="flex w-auto items-center rounded-2xl border-2 border-gray-500 ">
                  <button
                    onClick={decrement}
                    className="rounded-l-xl p-4 text-gray-700 hover:bg-yellow-900 hover:text-white"
                  >
                    -
                  </button>
                  <span className="flex w-16 justify-center">{qtdToCart}</span>
                  <button
                    onClick={increment}
                    className="rounded-r-xl p-4 text-gray-700 hover:bg-yellow-900 hover:text-white"
                  >
                    +
                  </button>
                </div>
                <button
                  disabled={qtdNoAvailable}
                  onClick={handleAddItem}
                  className="w-56 rounded-2xl border-2 border-black px-8 py-4 text-black hover:border-yellow-800 hover:bg-yellow-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-black disabled:hover:bg-transparent disabled:hover:text-black"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-4 border-t-2  border-gray-200 py-8 text-gray-400">
          <span>SKU: {variantSelect?.sku}</span>
          <span>Category: {product?.category.name}</span>
          <span>Tags: {product?.tags.join(', ')}</span>
          <span className="flex gap-4 ">
            Share:
            <button className="flex">
              <FakebookBlackIcon />
            </button>
            <button className="flex">
              <LinkedinBlackIcon />
            </button>
            <button className="flex">
              <TwitterBlackIcon />
            </button>
          </span>
        </div>
      </div>
    </div>
  )
}
