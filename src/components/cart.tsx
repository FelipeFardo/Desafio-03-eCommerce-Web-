import { CircleX, ShoppingCart } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

import { removeFromCart } from '@/cart/cart-slice'

import { RootState } from '../cart/store'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './cart-sheet'

export function Cart() {
  const { items, total } = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()

  function removeItemToCart(sku: string) {
    dispatch(
      removeFromCart({
        sku,
      }),
    )
  }
  return (
    <Sheet>
      <SheetTrigger>
        <ShoppingCart />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="w-60 border-b pb-4 pt-2 text-xl">
            Shopping Cart
          </SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col justify-between pb-10">
          <div className="py-4">
            {items.map((item) => {
              return (
                <div
                  key={item.sku}
                  className="mt-4 flex justify-between space-x-3"
                >
                  <div className="flex">
                    <img
                      src={item.imageUrl}
                      width={100}
                      alt={item.name}
                      className="rounded-2xl"
                    />
                    <div className="flex flex-col justify-center space-y-2 pl-8">
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <h4 className="space-x-2">
                        <span>{item.quantity} </span>
                        <span>x</span>
                        <span className="pl-4 text-yellow-600">
                          R$ {item.priceInCents}
                        </span>
                      </h4>
                    </div>
                  </div>
                  <div className="px-4 py-1">
                    <button onClick={() => removeItemToCart(item.sku)}>
                      <CircleX />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
          <div>
            <div className="flex justify-between pb-3">
              <h3>Sub total</h3>
              <span>RS {total.toFixed(2)}</span>
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
  )
}
