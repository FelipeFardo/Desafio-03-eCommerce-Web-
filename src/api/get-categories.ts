import { api } from './api-client'

interface GetCategoriesResponse {
  categories: {
    id: string
    name: string
    slug: string
  }[]
}

export async function getCategories() {
  const response = await api.get<GetCategoriesResponse>('/categories')

  return response.data
}
