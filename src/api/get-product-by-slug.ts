import { api } from './api-client'

interface GetProductBySlugResponse {
  product: {
    id: string
    isNew: boolean
    priceInCents: number
    oldPriceInCents: number | null
    name: string
    slug: string
    description: string
    categoryId: string
    discount: number
    createdAt: Date
    category: {
      id: string
      name: string
    }
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
    variants: {
      id: string
      productId: string
      sizeId: string
      colorId: string
      sku: string
      quantity: number
    }[]
    images: {
      id: string
      title: string
      url: string
      productId: string
    }[]
  }
}

export async function getProductBySlug(slug: string) {
  const response = await api.get<GetProductBySlugResponse>(
    `/products/${slug}`,
    {},
  )

  return response.data
}
