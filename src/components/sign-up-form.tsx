import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createAccount } from '@/api/create-account'

const SignUpSchema = z
  .object({
    name: z
      .string()
      .refine((value) => value.split(' ').length > 1, {
        message: 'Please, enter your full name',
      })
      .refine((value) => !/\d/.test(value), {
        message: 'Name cannot contain numbers',
      }),
    email: z
      .string()
      .email({ message: 'Please, provide a valid e-mail addresss.' }),
    password: z
      .string()
      .min(6, { message: 'Password should have at least 6 characters.' }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Password confirmation  does not match',
    path: [`password_confirmation`],
  })

type SignUpFormData = z.infer<typeof SignUpSchema>

export function SignUpForm() {
  const [authMessage, setAuthMessage] = useState<{
    message: string
    type: 'success' | 'error'
  } | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      setAuthMessage({
        message:
          'Please confirm your account by clicking the link sent to your email.',
        type: 'success',
      })
    },
    onError: () => {
      setAuthMessage({
        message:
          'Please confirm your account by clicking the link sent to your email.',
        type: 'success',
      })
    },
  })

  const onSubmit = async ({ email, name, password }: SignUpFormData) => {
    mutate({
      email,
      name,
      password,
    })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {authMessage?.type === 'error' && (
        <div
          className="mb-4 rounded-2xl bg-red-100 p-4 text-sm text-red-700"
          role="alert"
        >
          {authMessage.message}
        </div>
      )}
      {authMessage?.type === 'success' && (
        <div
          className="mb-4 rounded-2xl bg-green-200 p-4 text-sm text-green-700"
          role="alert"
        >
          {authMessage.message}
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium">
          Name
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          placeholder="Enter your name"
          className="mt-1   block w-full rounded-2xl border border-gray-300 p-2 text-sm shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium">
          Email address
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          placeholder=" Enter your email"
          className="mt-1 block  w-full rounded-2xl border border-gray-300 p-2 text-sm shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium">
          Password
        </label>
        <input
          {...register('password')}
          type="password"
          id="password"
          placeholder=" password"
          className="mt-1 block w-full rounded-2xl border border-gray-300 p-2 text-sm shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium">
          Confirm Password
        </label>
        <input
          {...register('password_confirmation')}
          type="password"
          id="password"
          placeholder="password"
          className="mt-1 block w-full rounded-2xl border border-gray-300 p-2 text-sm shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
        {errors.password_confirmation && (
          <p className="mt-1 text-sm text-red-600">
            {errors.password_confirmation.message}
          </p>
        )}
      </div>
      <button
        disabled={isPending}
        type="submit"
        className="w-full rounded-full bg-lime-900 px-4 py-2 text-sm text-white hover:bg-lime-950 focus:outline-none focus:ring-2 focus:ring-lime-950 focus:ring-offset-2"
      >
        {isPending ? (
          <LoaderCircle className="flex w-full animate-spin items-center" />
        ) : (
          'Sign up'
        )}
      </button>
    </form>
  )
}
