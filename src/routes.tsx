import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { Auth } from './pages/auth'
import { HomePage } from './pages/home'
import { ProductPage } from './pages/product'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/product/:slug', element: <ProductPage /> },
    ],
  },
  { path: '/auth', element: <Auth /> },
])
