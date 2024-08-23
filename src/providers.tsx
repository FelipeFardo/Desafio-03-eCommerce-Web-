import { QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import { Provider as ProviderRedux } from 'react-redux'

import { queryClient } from '@/lib/react-query'

import { store } from './cart/store'
import { SheetCartProvider } from './contexts/sheet-cart'
import { AuthProvider } from './contexts/useAuth'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SheetCartProvider>
          <Toaster />
          <ProviderRedux store={store}>
            <HelmetProvider>
              <Helmet titleTemplate="%s | Furniro" />
              {children}
            </HelmetProvider>
          </ProviderRedux>
        </SheetCartProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
