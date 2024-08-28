import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { useAuth } from '@/contexts/useAuth'

const SignInSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string(),
})
type SignInFormData = z.infer<typeof SignInSchema>

export function SignInForm() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login } = useAuth()

  const [authMessage, setAuthMessage] = useState<{
    message: string
    type: 'success' | 'error'
  } | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(SignInSchema),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      setAuthMessage({
        message: 'Login Successfuly',
        type: 'success',
      })
      setTimeout(() => {
        const redirect = searchParams.get('redirect')
        if (redirect) navigate(`/${redirect}`)
        else navigate('/')
      }, 2000)
    },
    onError: () => {
      setAuthMessage({
        message: 'Invalid credentials',
        type: 'error',
      })
    },
  })

  const onSubmit = async ({ email, password }: SignInFormData) => {
    mutate({
      email,
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
          Email address
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          placeholder=" Enter your email"
          className="mt-1  block w-full rounded-2xl border border-gray-300 p-2 text-sm shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
      <div className="mb-4">
        <div className="flex justify-between">
          <label htmlFor="email" className="block text-sm font-medium">
            Password
          </label>
          <a href="#" className="text-sm text-blue-800">
            forgot password
          </a>
        </div>
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
      <button
        disabled={isPending}
        type="submit"
        className="w-full rounded-full bg-lime-900 px-4 py-2 text-white hover:bg-lime-950 focus:outline-none focus:ring-2 focus:ring-lime-950 focus:ring-offset-2"
      >
        {isPending ? (
          <LoaderCircle className="flex w-full animate-spin items-center" />
        ) : (
          'Login'
        )}
      </button>
    </form>
  )
}
