import { api } from './api-client'

interface CalculateSummaryRequest {
  items: {
    productSlug: string
    sku: string
    quantity: number
  }[]
}

interface CalculateSummaryResponse {
  items: {
    quantity: number
    subTotal: number
    quantityAvailable: number
    variant: {
      id: string
      productId: string
      sizeId: string
      colorId: string
      sku: string
      size: {
        id: string
        productId: string
        name: string
        size: string
      }
      color: {
        id: string
        productId: string
        name: string
        color: string
      }
    }
    product: {
      oldPrice: number
      id: string
      name: string
      slug: string
      description: string
      categoryId: string
      discount: number
      priceInCents: number
      createdAt: Date
      images: {
        id: string
        title: string
        url: string
        productId: string
      }[]
    }
  }[]
  total: number
  message: {
    messages: string[]
    type: 'error'
  } | null
}

export async function calculateSummary({ items }: CalculateSummaryRequest) {
  const response = await api.post<CalculateSummaryResponse>(
    '/calculate-summary',
    {
      items,
    },
  )
  console.log(response.data)

  return response.data
}
