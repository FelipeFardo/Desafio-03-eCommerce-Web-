import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

interface CartItem {
  productSlug: string
  sku: string
  name: string
  color: string
  size: string
  priceInCents: number
  imageUrl: string
  quantityAvailable: number
  quantity: number
  subTotal: number
}

interface CartState {
  items: CartItem[]
  total: number
}

const initialState: CartState = {
  items: [],
  total: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        productSlug: string
        sku: string
        name: string
        color: string
        size: string
        quantityAvailable: number
        priceInCents: number
        imageUrl: string
        quantity: number
      }>,
    ) => {
      const existingItem = state.items.find(
        (item) => item.sku === action.payload.sku,
      )

      if (existingItem) {
        if (
          existingItem.quantityAvailable <
          action.payload.quantity + existingItem.quantity
        ) {
          toast.error(
            'Quantity not available, this item is already in your cart.',
          )
          return
        }

        existingItem.quantity += action.payload.quantity

        existingItem.subTotal +=
          action.payload.quantity * action.payload.priceInCents
        state.total += action.payload.quantity * action.payload.priceInCents
        toast.success(
          `${action.payload.name} has been successfully added to your cart!`,
        )
        return
      }

      state.items.push({
        ...action.payload,
        subTotal: action.payload.quantity * action.payload.priceInCents,
      })

      state.total += action.payload.quantity * action.payload.priceInCents

      toast.success(
        `${action.payload.name} has been successfully added to your cart!`,
      )
    },
    removeFromCart: (state, action: PayloadAction<{ sku: string }>) => {
      const existingItem = state.items.find(
        (item) => item.sku === action.payload.sku,
      )
      state.total -= existingItem?.subTotal || state.total

      state.items = state.items.filter(
        (item) => item.sku !== action.payload.sku,
      )
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
