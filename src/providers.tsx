import { QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Provider as ProviderRedux } from 'react-redux'

import { queryClient } from '@/lib/react-query'

import { store } from './cart/store'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ProviderRedux store={store}>
        <HelmetProvider>
          <Helmet titleTemplate="%s | Furniro" />
          {children}
        </HelmetProvider>
      </ProviderRedux>
    </QueryClientProvider>
  )
}
