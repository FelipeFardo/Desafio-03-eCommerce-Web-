import { createContext, useContext, useState } from 'react'

interface SheetCartContextType {
  isSheetCartOpen: boolean
  openSheetCart: () => void
  closeSheetCart: () => void
}

const SheetCartContext = createContext<SheetCartContextType | undefined>(
  undefined,
)

interface SheetCartProviderProps {
  children: React.ReactNode
}

export const SheetCartProvider = ({ children }: SheetCartProviderProps) => {
  const [isSheetCartOpen, setIsSheetCartOpen] = useState(false)

  const openSheetCart = () => setIsSheetCartOpen(true)
  const closeSheetCart = () => setIsSheetCartOpen(false)

  return (
    <SheetCartContext.Provider
      value={{ isSheetCartOpen, openSheetCart, closeSheetCart }}
    >
      {children}
    </SheetCartContext.Provider>
  )
}

export const useSheetCart = (): SheetCartContextType => {
  const context = useContext(SheetCartContext)
  if (!context) {
    throw new Error('useCartModal must be used within a modalprovider')
  }
  return context
}
