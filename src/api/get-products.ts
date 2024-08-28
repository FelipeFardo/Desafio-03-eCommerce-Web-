import { api } from './api-client'

interface GetProductRequest {
  pageIndex?: number
  perPage?: number
  shortBy?: 'asc' | 'desc' | 'default'
  categories?: string | null
}

interface GetProductsResponse {
  products: {
    id: string
    productId: string
    sizeId: string
    colorId: string
    sku: string
    quantity: 7
    color: {
      id: string
      productId: string
      name: string
      color: string
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
      createdAt: string
      colors: {
        id: string
        productId: string
        name: string
        color: string
      }[]
      sizes: {
        id: string
        productId: string
        name: string
        size: string
      }[]
    }
    image: {
      id: string
      title: string
      url: string
      productId: string
    }
    discount: number | null
    isNew: boolean
    priceInCents: number
    oldPriceInCents: number | null
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getProducts({
  pageIndex = 1,
  perPage = 16,
  categories,
  shortBy,
}: GetProductRequest) {
  const response = await api.get<GetProductsResponse>('/products', {
    params: {
      pageIndex,
      perPage,
      categories,
      shortBy,
    },
  })

  return response.data
}
