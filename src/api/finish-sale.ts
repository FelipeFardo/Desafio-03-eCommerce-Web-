import { api } from './api-client'

interface FinishSaleRequest {
  items: {
    productSlug: string
    sku: string
    quantity: number
  }[]
  firstName: string
  lastName: string
  zipCode: string
  country: string
  streetAddress: string
  city: string
  province: string
  addOnAddress: string
  email: string
  paymentMethod: 'direct_bank_tranfer' | 'pix' | 'cash_on_delivery'
  companyName?: string
  additionalInfo?: string
}

interface FinishSaleResponse {
  orderId: string
}

export async function finishSale({
  email,
  addOnAddress,
  city,
  country,
  firstName,
  items,
  lastName,
  paymentMethod,
  province,
  streetAddress,
  zipCode,
  additionalInfo,
  companyName,
}: FinishSaleRequest) {
  const response = await api.post<FinishSaleResponse>('/finish-sale', {
    email,
    addOnAddress,
    city,
    country,
    firstName,
    lastName,
    items,
    paymentMethod,
    province,
    streetAddress,
    zipCode,
    additionalInfo,
    companyName,
  })

  return response.data
}
