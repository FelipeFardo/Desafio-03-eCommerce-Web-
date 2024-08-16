import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const LoginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
})
type LoginFormData = z.infer<typeof LoginSchema>

export function SignInForm() {
  const [authMessage, setAuthMessage] = useState<{
    message: string
    type: 'success' | 'error'
  } | null>({
    message: 'Login success',
    type: 'success',
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = (data) => {
    console.log(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {authMessage?.type === 'error' && (
        <div
          className="text-ree-700 mb-4 rounded-2xl bg-red-100 p-4 text-sm"
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
          className="mt-1 block w-full rounded-2xl border border-gray-300 p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
          className="mt-1 block w-full rounded-2xl border border-gray-300 p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-lime-900 px-4 py-2 text-white hover:bg-lime-950 focus:outline-none focus:ring-2 focus:ring-lime-950 focus:ring-offset-2"
      >
        Login
      </button>
    </form>
  )
}
