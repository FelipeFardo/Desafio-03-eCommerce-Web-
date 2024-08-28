import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getOrderById } from '@/api/get-order-by-id'
import { resetCart } from '@/cart/cart-slice'
import { formatMoney } from '@/utis/formatMoney'

export function OrderPage() {
  const { orderId } = useParams<{ orderId: string }>()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetCart())
  }, [dispatch])

  const { data: result } = useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => getOrderById(orderId!),
  })

  if (!result?.order) return <LoadingSkeleton />

  const order = result?.order
  return (
    <div className="mx-auto my-8 max-w-4xl rounded-lg border bg-white p-6 shadow-md">
      <h1 className="mb-4 text-2xl font-semibold">Order details:</h1>
      <div className="mb-6">
        <h2 className="text-xl font-medium">Customer Information</h2>
        <p>
          <strong>Name:</strong> {order.firstName} {order.lastName}
        </p>

        <p>
          <strong>Company:</strong> {order.companyName || 'N/A'}
        </p>
        <p>
          <strong>Email:</strong> {order.email}
        </p>
        <p>
          <strong>Address:</strong> {order.streetAddress}, {order.addOnAddress},{' '}
          {order.city}, {order.province}, {order.zipCode}, {order.country}
        </p>
        <p>
          <strong>Additional Information:</strong>{' '}
          {order.additionalInfo || 'N/A'}
        </p>
        <p>
          <strong>Status:</strong> {order.status}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-medium">Payment Information</h2>
        <p>
          <strong>Payment Method:</strong> {order.paymentMethod}
        </p>
        <p>
          <strong>Total:</strong> Rp {formatMoney(order.totalInCents)}
        </p>
        <p>
          <strong>Date of order:</strong>{' '}
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-medium">Order Itens</h2>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="rounded-lg border p-4">
              <h3 className="text-lg font-semibold">{item.product.name}</h3>
              <p>
                <strong>Product slug:</strong> {item.product.slug}
              </p>
              <p>
                <strong>Product name:</strong> {item.product.name}
              </p>
              <p>
                <strong>SKU:</strong> {item.productVariant.sku}
              </p>
              <p>
                <strong>Color:</strong> {item.productVariant.color.name}
              </p>
              <p>
                <strong>Size:</strong> {item.productVariant.size.name}
              </p>
              <p>
                <strong>Quantity:</strong> {item.quantity}
              </p>
              <p>
                <strong>Price per Unit: </strong>
                Rp {formatMoney(item.priceInCentsPerUnit)}
              </p>

              <p>
                <strong>Subtotal:</strong> Rp{' '}
                {formatMoney(item.subTotalInCents)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const LoadingSkeleton = () => (
  <div className="mx-auto my-8 max-w-4xl animate-pulse rounded-lg border bg-white p-6 shadow-md">
    <div className="mb-4 h-8 w-1/4 rounded bg-gray-200"></div>
    <div className="space-y-3">
      <div className="h-4 w-3/4 rounded bg-gray-200"></div>
      <div className="h-4 w-1/2 rounded bg-gray-200"></div>
      <div className="h-4 w-5/6 rounded bg-gray-200"></div>
    </div>
    <div className="mt-6 space-y-3">
      <div className="h-4 w-1/4 rounded bg-gray-200"></div>
      <div className="h-4 w-1/2 rounded bg-gray-200"></div>
      <div className="h-4 w-3/4 rounded bg-gray-200"></div>
    </div>
    <div className="mt-6 space-y-3">
      <div className="h-4 w-1/4 rounded bg-gray-200"></div>
      <div className="h-20 w-full rounded bg-gray-200"></div>
      <div className="h-20 w-full rounded bg-gray-200"></div>
    </div>
  </div>
)
