import { LogIn, ShoppingCart } from 'lucide-react'

import furniroLogo from '@/assets/furniro.svg'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/cart-sheet'

import { Button } from './button'

export function Header() {
  return (
    <header className="mx-auto flex w-full px-12 py-8">
      <div className="flex w-full items-center justify-between">
        <button>
          <img width={150} src={furniroLogo} alt="" />
        </button>
        <nav className="flex gap-10">
          <Button variant="link" className="font-medium">
            Home
          </Button>
          <Button variant="link" className="font-medium">
            Shop
          </Button>
          <Button variant="link" className="font-medium">
            About
          </Button>
          <Button variant="link" className="font-medium">
            Contact
          </Button>
        </nav>
        <nav className="flex w-28 gap-8">
          <LogIn />
          <Sheet>
            <SheetTrigger>
              <ShoppingCart />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="w-60 border-b pb-4 pt-2">
                  <h1 className="text-xl">Shopping Cart</h1>
                </SheetTitle>
              </SheetHeader>
              <div className="flex h-full flex-col justify-between pb-10">
                <div className="py-4">
                  <h1>Produtos</h1>
                </div>
                <div>
                  <div className="flex justify-between pb-3">
                    <h1>Sub total</h1>
                    <span>RS 1.000.000</span>
                  </div>

                  <nav className="border-1 flex justify-between space-x-3 border-t py-4">
                    <button className="w-20 rounded-3xl border px-3 py-2">
                      Cart
                    </button>
                    <button className="w-36 rounded-3xl border px-3 py-2">
                      Checkout
                    </button>
                    <button className="w-36 rounded-3xl border px-3 py-2">
                      Comparison
                    </button>
                  </nav>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  )
}
