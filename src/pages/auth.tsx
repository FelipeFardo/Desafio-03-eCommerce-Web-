import { useState } from 'react'

import loginImage from '@/assets/images/520fab60716f712257d7f6a7fc48a42f.jpeg'
import { AppleIcon } from '@/components/icons/apple'
import { GoogleIcon } from '@/components/icons/google'
import { SignInForm } from '@/components/sign-in-form'
import { SignUpForm } from '@/components/sign-up'

export function Auth() {
  const [isRegister, setIsRegister] = useState<boolean>(false)

  return (
    <div className="flex min-h-screen">
      <div className="flex w-full items-center justify-center md:w-1/2">
        <div className="w-full max-w-md p-6">
          {!isRegister && (
            <h1 className="mb-6 text-3xl font-medium">Welcome back!</h1>
          )}
          {isRegister && (
            <h1 className="mb-6 text-3xl font-medium">Get Started Now!</h1>
          )}

          <h2 className="mb-6">
            Enter your Credentials to access your account
          </h2>

          {!isRegister && <SignInForm />}
          {isRegister && <SignUpForm />}
          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 flex-shrink text-gray-600">Or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="mt-4 flex space-x-3 text-xs">
            <button className="flex w-full items-center justify-center space-x-2 rounded-full  border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-lime-900 focus:ring-offset-2">
              <GoogleIcon />
              <span>Sign in with Google</span>
            </button>

            <button className="flex w-full items-center  justify-center  space-x-2 rounded-full  border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-lime-900 focus:ring-offset-2">
              <AppleIcon />
              <span>Entrar com Apple</span>
            </button>
          </div>
          {!isRegister && (
            <div className="mt-4 flex w-full justify-center">
              Don’t have an account?{' '}
              <a
                onClick={() => {
                  setIsRegister(true)
                }}
                className="cursor-pointer pl-2"
              >
                {' '}
                Sign Up
              </a>
            </div>
          )}
          {isRegister && (
            <div className="mt-4 flex w-full justify-center">
              Have an account?{' '}
              <a
                onClick={() => {
                  setIsRegister(false)
                }}
                className="cursor-pointer pl-2"
              >
                {' '}
                Sign In
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Imagem */}
      <div
        className="hidden bg-cover bg-center md:block md:w-1/2"
        style={{ backgroundImage: `url('${loginImage}')` }}
      ></div>
    </div>
  )
}
