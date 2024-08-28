import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { calculateSummary } from '@/api/calculate-summary'
import { updateCartToSummary } from '@/cart/cart-slice'
import type { RootState } from '@/cart/store'
import { formatMoney } from '@/utis/formatMoney'

import { CheckoutSummaryCardSkeleton } from './checkout-summary-card-skeleton'

interface CheckoutSummaryCardProps {
  message: {
    message: string[]
    type: 'success' | 'error'
  } | null
  handleMessage: (
    params: {
      messages: string[]
      type: 'success' | 'error'
    } | null,
  ) => void
}

export function CheckoutSummaryCard({
  handleMessage,
  message,
}: CheckoutSummaryCardProps) {
  const { items } = useSelector((state: RootState) => state.cart)

  const dispatch = useDispatch()

  const itemsFormated = items.map((item) => {
    return {
      productSlug: item.productSlug,
      sku: item.sku,
      quantity: item.quantity,
    }
  })

  const {
    data: result,
    isLoading: isLoadingCalculateSummary,
    isRefetching: isRefetchingCalculateSummary,
  } = useQuery({
    staleTime: 0,
    queryKey: ['summary'],
    queryFn: async () => {
      const result = await calculateSummary({
        items: itemsFormated,
      })

      const itensFormated = result.items.map((item) => {
        return {
          productSlug: item.product.slug,
          sku: item.variant.sku,
          name: item.product.name,
          colorName: item.variant.color.name,
          sizeName: item.variant.size.name,
          color: item.variant.color.color,
          size: item.variant.size.size,
          quantityAvailable: item.quantityAvailable,
          priceInCents: item.variant.priceInCents,
          imageUrl: item.product.image.url,
          quantity: item.quantity,
          subTotal: item.subTotal,
        }
      })

      dispatch(
        updateCartToSummary({
          items: itensFormated,
          total: result.total,
        }),
      )

      return result
    },
  })

  useEffect(() => {
    if (result?.message) {
      handleMessage({
        messages: result?.message?.messages,
        type: 'error',
      })
    }
  }, [result, handleMessage])

  if (isLoadingCalculateSummary || isRefetchingCalculateSummary)
    return <CheckoutSummaryCardSkeleton />

  const itemsUpdated = result?.items
  const total = result?.total

  return (
    <div>
      {message?.type === 'error' && (
        <div
          className="mb-4 rounded-2xl bg-red-100 p-4 text-sm text-red-700"
          role="alert"
        >
          {message?.message}
        </div>
      )}
      <div className="mb-4 flex justify-between">
        <h2 className="text-xl font-semibold">Product</h2>
        <h2 className="text-xl font-semibold">Subtotal</h2>
      </div>
      <ul>
        {itemsUpdated &&
          itemsUpdated.map((item) => {
            return (
              <li key={item.variant.sku} className="mb-4 flex justify-between">
                <div>
                  <p>
                    <span className="text-gray-500">{item.product.name} </span>
                    <span className="font-semibol pl-4 text-sm">
                      x {item.quantity}
                    </span>
                  </p>
                  <div className="flex space-x-4">
                    <h4 className="flex items-center gap-2 text-sm text-gray-500 ">
                      color:
                      <span>{item.variant.color.name}</span>
                    </h4>
                    <h4 className="flex text-sm text-gray-500 ">
                      size: {item.variant.size.name}
                    </h4>
                  </div>
                </div>
                <span>Rp{formatMoney(item.subTotal)}</span>
              </li>
            )
          })}
      </ul>
      <div className="text-md mb-4 flex justify-between">
        <span>Subtotal</span>

        <span>Rp{formatMoney(total!)}</span>
      </div>
      <div className="text-md flex justify-between border-b-2 pb-4">
        <span>Total</span>
        <span className="text-2xl text-yellow-600">
          Rp{formatMoney(total!)}
        </span>
      </div>
    </div>
  )
}
