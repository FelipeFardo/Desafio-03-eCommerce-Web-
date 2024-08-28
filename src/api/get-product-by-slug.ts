import { api } from './api-client'

interface GetProductBySlugResponse {
  product: {
    id: string
    name: string
    slug: string
    description: string
    categoryId: string
    createdAt: Date
    tags: string[]
    category: {
      id: string
      name: string
      slug: string
    }
    colors: {
      id: string
      productId: string
      name: string
      hexCode: string
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
      discount: number | null
      oldPriceInCents: number | null
      priceInCents: number
      isNew: boolean
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
  const response = await api.get<GetProductBySlugResponse>(`/products/${slug}`)

  return response.data
}
