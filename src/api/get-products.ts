import { api } from './api-client'

interface GetProductRequest {
  pageIndex: number
  perPage: number
}

interface GetProductsResponse {
  products: {
    id: string
    isNew: boolean
    priceInCents: number
    oldPriceInCents: number
    name: string
    slug: string
    description: string
    category: string
    discount: number
    createdAt: Date
    image: {
      id: string
      title: string
      url: string
      productId: string
    }
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getProducts({
  pageIndex = 1,
  perPage = 20,
}: GetProductRequest) {
  const response = await api.get<GetProductsResponse>('/products', {
    params: {
      pageIndex,
      perPage,
    },
  })

  return response.data
}
