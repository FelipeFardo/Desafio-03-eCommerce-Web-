import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { getOrderById } from '@/api/get-order-by-id'
import { formatMoney } from '@/utis/formatMoney'

export function OrderPage() {
  const { orderId } = useParams<{ orderId: string }>()

  const { data: result } = useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => getOrderById(orderId!),
  })

  if (!result?.order) return <h1>Loading...</h1>

  const order = result?.order
  return (
    <div className="mx-auto my-8 max-w-4xl rounded-lg bg-white p-6 shadow-md">
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
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-medium">Payment Information</h2>
        <p>
          <strong>Método de Pagamento:</strong> {order.paymentMethod}
        </p>
        <p>
          <strong>Total:</strong> R$ {formatMoney(order.totalInCents)}
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
                <strong>Product Id:</strong> {item.quantity}
              </p>
              <p>
                <strong>Quantity:</strong> {item.quantity}
              </p>
              <p>
                <strong>Subtotal:</strong> R${' '}
                {formatMoney(item.subTotalInCents)}
              </p>
              <p>
                <strong>SKU:</strong> {item.productVariant.sku}
              </p>
              <p>
                <strong>Description:</strong> {item.product.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
