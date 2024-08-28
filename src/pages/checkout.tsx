import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LoaderCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { finishSale } from '@/api/finish-sale'
import { getCep } from '@/api/via-cep'
import bannerImage from '@/assets/images/banner.jpeg'
import type { RootState } from '@/cart/store'
import * as Banner from '@/components/banner'
import { CheckoutSummaryCard } from '@/components/checkout-summary-card'
import { useAuth } from '@/contexts/useAuth'
import { cn } from '@/lib/utils'
import { formatZipCode } from '@/utis/formatZipCode'

const paymentMethods = [
  'direct_bank_tranfer',
  'pix',
  'cash_on_delivery',
] as const

const checkoutSchema = z.object({
  firstName: z.string().min(3, 'First name is required'),
  lastName: z.string().min(3, 'Last name is required'),
  companyName: z.string().optional(),
  zipCode: z
    .string()
    .length(9, { message: 'ZIP Code is required' })
    .transform((value) => value.replace(/\D/g, '')),
  country: z.string().min(1, 'Country is required'),
  streetAddress: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  province: z.string().min(1, 'Province is required'),
  addOnAddress: z.string().min(1, 'Add-on addres is required'),
  email: z.string().email('Invalid email address'),
  additionalInfo: z.string().optional(),
  paymentMethod: z.enum(paymentMethods, {
    required_error: 'payment method is required',
  }),
})

type FormData = z.infer<typeof checkoutSchema>

export function CheckoutPage() {
  const [message, setMessage] = useState<{
    message: string[]
    type: 'success' | 'error'
  } | null>(null)
  const { isAuth, user } = useAuth()
  const { items } = useSelector((state: RootState) => state.cart)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!isAuth) navigate('/auth')
  }, [isAuth, navigate])

  const {
    register,
    clearErrors,
    handleSubmit,
    setValue,
    control,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'direct_bank_tranfer',
    },
  })

  useEffect(() => {
    async function getUserProfile() {
      if (user) {
        const names = user.name.split(' ')
        const firstName = names[0]
        const lastName = names[names.length - 1]
        setValue('firstName', firstName)
        setValue('lastName', lastName)
        setValue('email', user.email)
      }
    }
    getUserProfile()
  }, [setValue, user])

  function handleMessage(
    data: {
      messages: string[]
      type: 'success' | 'error'
    } | null,
  ) {
    if (data) setMessage({ message: data.messages, type: data.type })
    else setMessage(null)
  }

  async function autoCompleteAddressByZipCode(zipCode: string) {
    if (zipCode.length === 8) {
      try {
        setValue('streetAddress', 'loading...')
        setValue('province', 'loading...')
        setValue('city', 'loading...')
        setValue('country', 'loading...')
        const result = await getCep(zipCode)

        if (result.erro) throw new Error()

        if (result.logradouro) setValue('streetAddress', result.logradouro)
        if (result.uf) setValue('province', result.uf)
        if (result.localidade) setValue('city', result.localidade)
        setValue('country', 'Brasil')
        clearErrors(['zipCode', 'country', 'city', 'province', 'streetAddress'])
      } catch (err) {
        setValue('streetAddress', '')
        setValue('province', '')
        setValue('city', '')
        setValue('country', '')
        setError('zipCode', { message: 'Zip Code invalid' })
      }
    }
  }

  const handleCepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCep = formatZipCode(event.target.value)
    setValue('zipCode', formattedCep)
    const zipCode = formattedCep.replace(/\D/g, '')
    autoCompleteAddressByZipCode(zipCode)
  }

  const { mutate, isPending } = useMutation({
    mutationFn: finishSale,

    onSuccess: (data) => {
      navigate(`/order/${data.orderId}`)
      window.scrollTo(0, 0)
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['summary'] })

      handleMessage({
        messages: ['Sorry, there was an error processing your purchase.'],
        type: 'error',
      })
    },
  })

  const onSubmit = async (data: FormData) => {
    const itemsFormated = items.map((item) => {
      return {
        productSlug: item.productSlug,
        sku: item.sku,
        quantity: item.quantity,
      }
    })

    mutate({
      addOnAddress: data.addOnAddress,
      city: data.city,
      country: data.country,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      paymentMethod: data.paymentMethod,
      province: data.province,
      streetAddress: data.streetAddress,
      zipCode: data.zipCode,
      additionalInfo: data.additionalInfo,
      companyName: data.companyName,
      items: itemsFormated,
    })
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
            <span> Checkout </span>
          </Banner.Description>
        </Banner.Content>
      </Banner.Root>

      <div className="mx-auto flex max-w-[1400px] flex-col  gap-8 px-32 py-16">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col justify-center lg:flex-row lg:space-x-32"
        >
          <div className=" w-full space-y-8 rounded-lg lg:w-1/2">
            <h2 className="mb-4 text-2xl font-semibold">Billing details</h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  {...register('firstName')}
                  className="w-full rounded-xl border border-gray-300 p-2"
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  {...register('lastName')}
                  className="w-full  rounded-xl border border-gray-300  p-2"
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium">
                Company Name (Optional)
              </label>
              <input
                type="text"
                {...register('companyName')}
                className="w-full  rounded-xl border border-gray-300 p-2"
              />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  ZIP Code
                </label>
                <input
                  type="text"
                  {...register('zipCode')}
                  onChange={handleCepChange}
                  className="w-full rounded-xl border border-gray-300 p-2"
                />
                {errors.zipCode && (
                  <p className="text-sm text-red-500">
                    {errors.zipCode.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Country / Region
                </label>
                <input
                  type="text"
                  {...register('country')}
                  className="w-full  rounded-xl border border-gray-300 p-2"
                />
                {errors.country && (
                  <p className="text-sm text-red-500">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium">
                Street Address
              </label>
              <input
                type="text"
                {...register('streetAddress')}
                className="w-full  rounded-xl border border-gray-300 p-2"
              />
              {errors.streetAddress && (
                <p className="text-sm text-red-500">
                  {errors.streetAddress.message}
                </p>
              )}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Town / City
                </label>
                <input
                  type="text"
                  {...register('city')}
                  className="w-full  rounded-xl border border-gray-300 p-2"
                />
                {errors.city && (
                  <p className="text-sm text-red-500">{errors.city.message}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Province
                </label>
                <input
                  type="text"
                  {...register('province')}
                  className="w-full  rounded-xl border border-gray-300 p-2"
                />
                {errors.province && (
                  <p className="text-sm text-red-500">
                    {errors.province.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium">
                Add-on address
              </label>
              <input
                type="text"
                {...register('addOnAddress')}
                className="w-full  rounded-xl border border-gray-300 p-2"
              />
              {errors.addOnAddress && (
                <p className="text-sm text-red-500">
                  {errors.addOnAddress.message}
                </p>
              )}
            </div>
            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium">
                Email Address
              </label>
              <input
                type="email"
                {...register('email')}
                className="w-full  rounded-xl border border-gray-300 p-2"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium">
                Additional Information
              </label>
              <textarea
                {...register('additionalInfo')}
                placeholder="Additional Information"
                className="w-full  rounded-xl border border-gray-300 p-2"
              />
            </div>
          </div>
          <div className="flex flex-col rounded-lg  bg-white  p-6 lg:w-1/2 lg:justify-normal">
            <CheckoutSummaryCard
              message={message}
              handleMessage={handleMessage}
            />
            <Controller
              name="paymentMethod"
              control={control}
              render={({ field }) => (
                <>
                  {paymentMethods.map((method) => (
                    <div key={method}>
                      <div className="flex  items-center gap-4 space-y-4">
                        <input
                          type="radio"
                          {...field}
                          id={method}
                          value={method}
                          checked={field.value === method}
                          className="peer hidden"
                        />

                        <label
                          htmlFor={method}
                          className={`peer-checked:border-black-500 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border-2  peer-checked:bg-black`}
                        ></label>
                        <span
                          className={cn(
                            field.value === method
                              ? 'text-black'
                              : 'text-gray-500',
                          )}
                        >
                          {method}
                        </span>
                      </div>
                      {field.value === method && (
                        <p className="py-2 text-sm text-gray-500">
                          Make your payment directly into our bank account.
                          Please use your Order ID as the payment reference.
                          Your order will not be shipped until the funds have
                          cleared in our account.
                        </p>
                      )}
                    </div>
                  ))}
                  {errors.paymentMethod && (
                    <p className="text-sm text-red-500">
                      {errors.paymentMethod.message}
                    </p>
                  )}
                </>
              )}
            />

            <button
              disabled={isPending}
              type="submit"
              className="mx-auto mt-6 flex w-56 justify-center rounded-2xl border-2 border-gray-600 px-4 py-2 text-black  hover:bg-yellow-900 hover:text-white"
            >
              {isPending ? (
                <LoaderCircle className="flex w-full animate-spin items-center" />
              ) : (
                'Place order'
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
