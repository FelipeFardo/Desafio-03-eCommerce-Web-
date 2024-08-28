import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

interface CartItem {
  productSlug: string
  sku: string
  name: string
  hexCode: string
  size: string
  colorName: string
  sizeName: string
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

const loadCartFromLocalStorage = (): { items: CartItem[]; total: number } => {
  const cart = localStorage.getItem('cart')
  if (cart) {
    try {
      const parsedCart = JSON.parse(cart)
      return {
        items: parsedCart.items || [],
        total: parsedCart.total || 0,
      }
    } catch (error) {
      return { items: [], total: 0 }
    }
  }
  return { items: [], total: 0 }
}

const initialState: CartState = {
  ...loadCartFromLocalStorage(),
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
        hexCode: string
        colorName: string
        sizeName: string
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

        localStorage.setItem('cart', JSON.stringify(state))
        return
      }

      state.items.push({
        ...action.payload,
        subTotal: action.payload.quantity * action.payload.priceInCents,
      })

      state.total += action.payload.quantity * action.payload.priceInCents

      localStorage.setItem('cart', JSON.stringify(state))
    },
    removeFromCart: (state, action: PayloadAction<{ sku: string }>) => {
      const existingItem = state.items.find(
        (item) => item.sku === action.payload.sku,
      )

      if (!existingItem) return

      state.total -= existingItem?.subTotal

      state.items = state.items.filter(
        (item) => item.sku !== action.payload.sku,
      )
      localStorage.setItem('cart', JSON.stringify(state))
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ sku: string; quantity: number }>,
    ) => {
      const item = state.items.find((item) => item.sku === action.payload.sku)
      if (item) {
        if (item.quantityAvailable < action.payload.quantity) {
          toast.error(
            'Quantity not available, this item is already in your cart.',
          )
          return
        }
        state.total -= item.subTotal
        item.quantity = action.payload.quantity
        item.subTotal = action.payload.quantity * item.priceInCents
        state.total += action.payload.quantity * item.priceInCents
      }

      localStorage.setItem('cart', JSON.stringify(state))
    },
    updateCartToSummary: (
      state,
      action: PayloadAction<{
        items: {
          productSlug: string
          sku: string
          name: string
          hexCode: string
          colorName: string
          size: string
          sizeName: string
          quantityAvailable: number
          priceInCents: number
          imageUrl: string
          quantity: number
          subTotal: number
        }[]
        total: number
      }>,
    ) => {
      const {
        payload: { items, total },
      } = action
      state.items = []
      state.total = total

      items.forEach((item) => {
        state.items.push({
          hexCode: item.hexCode,
          imageUrl: item.imageUrl,
          name: item.name,
          colorName: item.colorName,
          sizeName: item.sizeName,
          priceInCents: item.priceInCents,
          productSlug: item.productSlug,
          quantity: item.quantity,
          quantityAvailable: item.quantityAvailable,
          size: item.size,
          sku: item.sku,
          subTotal: item.subTotal,
        })
      })
      localStorage.setItem('cart', JSON.stringify(state))
    },
    resetCart: () => {
      localStorage.removeItem('cart')

      return {
        items: [],
        total: 0,
      }
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  updateCartToSummary,
  resetCart,
} = cartSlice.actions
export default cartSlice.reducer
