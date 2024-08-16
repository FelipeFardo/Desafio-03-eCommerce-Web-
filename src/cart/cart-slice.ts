import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CartItem {
  productId: string
  sku: string
  name: string
  priceInCents: number
  imageUrl: string
  quantity: number
  subTotal: number
}

interface CartState {
  items: CartItem[]
  total: number
}

const initialState: CartState = {
  items: [
    {
      productId: 'b424cc33-d0b8-4046-b269-e54e4a1fa5dd',
      imageUrl:
        'https://pub-9448e6c9570e405b8072625bd2387965.r2.dev/product_01.png',
      sku: 'SKU053518',
      name: 'Shoes',
      priceInCents: 333,
      quantity: 2,
      subTotal: 666,
    },
    {
      productId: 'b424cc33-d0b8-4046-b269-e54e4a1fa5dd',
      imageUrl:
        'https://pub-9448e6c9570e405b8072625bd2387965.r2.dev/product_01.png',
      sku: 'SKU053518',
      name: 'Shoes',
      priceInCents: 333,
      quantity: 2,
      subTotal: 666,
    },
  ],
  total: 666,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<Omit<CartItem, 'quantity' | 'subTotal'>>,
    ) => {
      const existingItem = state.items.find(
        (item) => item.sku === action.payload.sku,
      )
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          subTotal: action.payload.priceInCents,
        })
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.sku !== action.payload)
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const item = state.items.find((item) => item.sku === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
      }
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions
export default cartSlice.reducer
