export interface Product {
  id: string
  name: string
  description: string
  imageUrl: string
  price: number
  priceOld?: number
  new?: boolean
  discountPrice?: number
}
