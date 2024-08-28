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
    quantityAvailable: number
    product: {
      image: {
        id: string
        title: string
        url: string
        productId: string
      }
      id: string
      name: string
      slug: string
      description: string
      categoryId: string
      createdAt: Date
    }
    variant: {
      id: string
      productId: string
      sizeId: string
      colorId: string
      sku: string
      quantity: number
      discount: number | null
      priceInCents: number
      createdAt: Date
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
      product: {
        id: string
        name: string
        slug: string
        description: string
        categoryId: string
        createdAt: Date
        images: [
          {
            id: string
            title: string
            url: string
            productId: string
          },
        ]
      }
    }
    quantity: number
    subTotal: number
  }[]
  total: number
  message: {
    messages: string[]
    type: 'error' | 'success'
  }
}

export async function calculateSummary({ items }: CalculateSummaryRequest) {
  const response = await api.post<CalculateSummaryResponse>(
    '/calculate-summary',
    {
      items,
    },
  )

  return response.data
}
