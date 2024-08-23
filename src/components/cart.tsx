import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { ShoppingCart, Trash } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { removeFromCart } from '@/cart/cart-slice'
import { useSheetCart } from '@/contexts/sheet-cart'
import { formatMoney } from '@/utis/formatMoney'

import { RootState } from '../cart/store'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from './cart-sheet'

export function Cart() {
  const { items, total } = useSelector((state: RootState) => state.cart)
  const { isSheetCartOpen, openSheetCart, closeSheetCart } = useSheetCart()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function redirectToCart() {
    closeSheetCart()
    navigate('/cart')
  }
  function redirectToChekout() {
    closeSheetCart()
    navigate('/checkout')
  }
  function removeItemToCart(sku: string) {
    dispatch(
      removeFromCart({
        sku,
      }),
    )
  }

  return (
    <Sheet
      defaultOpen={isSheetCartOpen}
      open={isSheetCartOpen}
      onOpenChange={isSheetCartOpen ? closeSheetCart : openSheetCart}
    >
      <SheetTrigger>
        <ShoppingCart />
      </SheetTrigger>
      <SheetOverlay className="data-[state=open]:animate-fadeIn fixed inset-0  bg-black/50 backdrop-blur-sm" />

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
                          R$ {formatMoney(item.priceInCents)}
                        </span>
                      </h4>
                    </div>
                  </div>
                  <div className="px-4 py-1">
                    <AlertDialog.Root>
                      <AlertDialog.Trigger asChild className="cursor-pointer">
                        <Trash className="text-yellow-900" />
                      </AlertDialog.Trigger>
                      <AlertDialog.Portal>
                        <AlertDialog.Content className="data-[state=open]:animate-scaleIn fixed left-[50%] top-[50%] z-50  max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-2xl border-2 border-yellow-900  bg-white p-6 shadow-xl focus:outline-none">
                          <AlertDialog.Title className="mb-2 text-xl font-semibold text-gray-900">
                            Deseja remover item do carrinho?
                          </AlertDialog.Title>
                          <AlertDialog.Description className="mb-5 mt-2 text-sm leading-normal text-gray-600"></AlertDialog.Description>
                          <div className="flex justify-end gap-4">
                            <AlertDialog.Cancel asChild>
                              <button className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
                                Cancelar
                              </button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action asChild>
                              <button
                                onClick={() => removeItemToCart(item.sku)}
                                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                              >
                                Remover
                              </button>
                            </AlertDialog.Action>
                          </div>
                        </AlertDialog.Content>
                      </AlertDialog.Portal>
                    </AlertDialog.Root>
                  </div>
                </div>
              )
            })}
          </div>
          <div>
            <div className="flex justify-between pb-3">
              <h3>Sub total</h3>
              <span>RS {formatMoney(total)}</span>
            </div>

            <nav className="border-1 flex justify-between space-x-3 border-t py-4">
              <button
                disabled={!items.length}
                onClick={redirectToCart}
                className="w-20 rounded-3xl border px-3 py-2 disabled:cursor-not-allowed disabled:text-gray-500"
              >
                Cart
              </button>
              <button
                disabled={!items.length}
                onClick={redirectToChekout}
                className="w-36 rounded-3xl border px-3 py-2 disabled:cursor-not-allowed disabled:text-gray-500"
              >
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
