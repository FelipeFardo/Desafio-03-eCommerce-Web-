import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { Auth } from './pages/auth'
import { HomePage } from './pages/home'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [{ path: '/', element: <HomePage /> }],
  },
  { path: '/auth', element: <Auth /> },
  // { path: '/product/:slug', element: <PageProduct /> },
])
