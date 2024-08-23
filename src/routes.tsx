import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { Auth } from './pages/auth'
import { CartPage } from './pages/cart'
import { CheckoutPage } from './pages/checkout'
import { HomePage } from './pages/home'
import { ProductPage } from './pages/product'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/product/:productSlug', element: <ProductPage /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/checkout', element: <CheckoutPage /> },
    ],
  },
  { path: '/auth', element: <Auth /> },
])
