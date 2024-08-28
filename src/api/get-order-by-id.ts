import { api } from './api-client'

interface getOrderByIdResponse {
  order: {
    id: string
    customerId: string
    firstName: string
    lastName: string
    companyName: string
    zipCode: string
    country: string
    streetAddress: string
    status: 'PENDING' | 'IN_PROGRESS' | 'SHIPPED' | 'DELIVERED' | 'COMPLETED'
    city: string
    province: string
    email: string
    additionalInfo: string
    addOnAddress: string
    paymentMethod: string
    totalInCents: number
    createdAt: Date
    items: [
      {
        id: string
        productId: string
        productVariantId: string
        orderId: string
        quantity: number
        priceInCentsPerUnit: number
        subTotalInCents: number
        product: {
          id: string
          name: string
          slug: string
          description: string
          categoryId: string
          discount: number | null
          priceInCents: number
          createdAt: Date
        }
        productVariant: {
          id: string
          productId: string
          sizeId: string
          colorId: string
          sku: string
          quantity: number
          color: {
            id: string
            productId: string
            name: string
            hexCode: string
          }
          size: {
            id: string
            productId: string
            name: string
            size: string
          }
        }
      },
    ]
  }
}

export async function getOrderById(orderId: string) {
  const response = await api.get<getOrderByIdResponse>(`/order/${orderId}`)

  return response.data
}
