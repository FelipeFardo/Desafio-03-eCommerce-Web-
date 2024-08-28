import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { Trash } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import bannerImage from '@/assets/images/banner.jpeg'
import { removeFromCart, updateQuantity } from '@/cart/cart-slice'
import type { RootState } from '@/cart/store'
import * as Banner from '@/components/banner'
import { Image } from '@/components/image'
import { useAuth } from '@/contexts/useAuth'
import { cn } from '@/lib/utils'
import { formatMoney } from '@/utis/formatMoney'

export function CartPage() {
  const { items, total } = useSelector((state: RootState) => state.cart)
  const { isAuth } = useAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function redirectToCheckout() {
    if (isAuth) navigate('/checkout')
    else navigate('/auth?redirect=checkout')
    window.scrollTo(0, 0)
  }

  function updateQuantityFunction({
    sku,
    quantity,
  }: {
    sku: string
    quantity: number
  }) {
    if (quantity < 1) return
    dispatch(
      updateQuantity({
        sku,
        quantity,
      }),
    )
  }
  function removeItemToCart(sku: string) {
    dispatch(
      removeFromCart({
        sku,
      }),
    )
  }
  return (
    <>
      <Banner.Root>
        <Banner.Image imageUrl={bannerImage} />
        <Banner.Content className="flex space-y-4">
          <Banner.Title>Shop</Banner.Title>
          <Banner.Description className="flex items-center space-x-3 text-lg">
            <span className="font-bold"> Home</span>
            <span className="font-xs text-4xl">{'>'}</span>
            <span> Cart </span>
          </Banner.Description>
        </Banner.Content>
      </Banner.Root>
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="flex items-end justify-center space-x-10 rounded-lg bg-tertiary py-4 shadow-lg sm:space-x-20 md:space-x-16 xl:space-x-36">
              <h3 className="text-md font-medium">Product</h3>
              <h3 className="text-md font-medium">Price</h3>
              <h3 className="text-md font-medium">Quantity</h3>
              <h3 className="text-md font-medium">Subtotal</h3>
            </div>
            {items.map((item) => {
              return (
                <div
                  key={item.sku}
                  className="flex items-center justify-around rounded-lg py-8"
                >
                  <button
                    onClick={() => {
                      navigate(`/product/${item.productSlug}?sku=${item.sku}`)
                      window.scrollTo(0, 0)
                    }}
                    className="flex w-20  space-x-4 lg:w-32"
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      className="hidden h-20 w-20 rounded-xl object-cover lg:block"
                    />
                    <div className="flex flex-col items-start">
                      <h3 className="flex flex-col text-lg font-medium text-gray-500">
                        {item.name}
                      </h3>
                      <h4 className="flex items-center gap-2 text-sm text-gray-500 ">
                        color:
                        <span>{item.colorName}</span>
                        <span
                          className={cn(
                            'flex h-4 w-4 rounded-full border-2 border-black',
                          )}
                          style={{ backgroundColor: item.color }}
                        ></span>
                      </h4>
                      <h4 className="text-sm text-gray-500 ">
                        size: {item.sizeName}
                      </h4>
                    </div>
                  </button>

                  <div className="flex min-w-32 justify-center">
                    <p className="text-gray-500">
                      ${formatMoney(item.priceInCents)}
                    </p>
                  </div>

                  <div className="flex items-center rounded-2xl border-2 border-gray-500">
                    <button
                      onClick={() =>
                        updateQuantityFunction({
                          sku: item.sku,
                          quantity: item.quantity - 1,
                        })
                      }
                      className="rounded-l-xl p-2 text-gray-700 hover:bg-yellow-900 hover:text-white"
                    >
                      -
                    </button>
                    <span className="flex w-10 justify-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantityFunction({
                          sku: item.sku,
                          quantity: item.quantity + 1,
                        })
                      }
                      className="rounded-r-xl p-2 text-gray-700 hover:bg-yellow-900 hover:text-white"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex w-36 items-center justify-end space-x-4">
                    <p className="flex items-center text-gray-500">
                      $ {formatMoney(item.subTotal)}
                    </p>

                    <AlertDialog.Root>
                      <AlertDialog.Trigger asChild>
                        <Trash className="text-yellow-900" />
                      </AlertDialog.Trigger>
                      <AlertDialog.Portal>
                        <AlertDialog.Overlay className="data-[state=open]:animate-fadeIn fixed inset-0 bg-black/50 backdrop-blur-sm" />
                        <AlertDialog.Content className="data-[state=open]:animate-scaleIn fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-2xl border-2 border-yellow-900  bg-white p-6 shadow-xl focus:outline-none">
                          <AlertDialog.Title className="mb-2 text-xl font-semibold text-gray-900">
                            Do you want to remove item from cart?
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
                                Remove
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
            <div className="rounded-lg bg-tertiary p-6 shadow-lg">
              <h2 className="mb-4 flex justify-center text-2xl font-semibold">
                Cart totals
              </h2>
              <div className="p-2 lg:p-12">
                <div className="mb-4 flex justify-between">
                  <span className="text-md">Subtotal:</span>
                  <span className="text-md text-gray-500">
                    $ {formatMoney(total)}
                  </span>
                </div>
                <div className="mb-6 flex justify-between">
                  <span className="text-md">Total:</span>
                  <span className="text-xl font-medium text-yellow-600">
                    $ {formatMoney(total)}
                  </span>
                </div>
                <div className="flex justify-center pt-8">
                  <button
                    onClick={redirectToCheckout}
                    className="rounded-2xl border-2 border-gray-600  px-4 py-3 font-medium hover:bg-yellow-900 hover:text-white 2xl:px-12"
                  >
                    Check Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
