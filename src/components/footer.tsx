import { useState } from 'react'

import { validEmail } from '@/ultis/validEmail'

import { Button } from './button'

export function Footer() {
  return (
    <footer className="mx-auto flex max-w-screen-xl flex-wrap justify-around">
      <Address />
      <Menu />
      <Newsletter />
      <Copyright />
    </footer>
  )
}

function Menu() {
  return (
    <div className="flex flex-row gap-10">
      <div className="m-10 flex max-w-xs flex-col justify-start gap-7">
        <span className="px-4 text-lg text-gray-600">Links</span>
        <Button variant="link" className="text-start">
          Home
        </Button>
        <Button variant="link" className="text-start">
          Shop
        </Button>
        <Button variant="link" className="text-start">
          About
        </Button>
        <Button variant="link" className="text-start">
          Contact
        </Button>
      </div>
      <div className="m-10 flex max-w-xs flex-col gap-7 ">
        <span className="px-4 text-lg text-gray-600">Help</span>
        <Button variant="link" className="text-start">
          Payment Options
        </Button>
        <Button variant="link" className="text-start">
          Returns
        </Button>
        <Button variant="link" className="text-start">
          Privacy Policies
        </Button>
      </div>
    </div>
  )
}

function Newsletter() {
  const [email, setEmail] = useState('')

  let emailErrorMsg = 'Please enter a valid email address'
  const emailValid = validEmail(email)

  if (emailValid || !email) emailErrorMsg = ''
  return (
    <div className="m-10 flex max-w-xs flex-col gap-7">
      <span className="text-lg text-gray-600">Newsletter</span>
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your Email Address"
          className="border-b border-none border-black py-1 text-sm focus:shadow-none focus:outline-none"
        />
        <button
          disabled={!emailValid}
          className="cursor-pointer border-b border-none border-black bg-transparent py-1 text-sm disabled:cursor-not-allowed"
        >
          SUBSCRIBE
        </button>
      </div>
      <p className="relative -top-5 text-xs text-red-600">{emailErrorMsg}</p>
    </div>
  )
}

function Address() {
  return (
    <div className="m-10 flex max-w-xs flex-col">
      <h3 className="pb-8 text-2xl font-semibold">Furniro.</h3>
      <span className="text-gray-400">
        400 University Drive Suite 200 Coral Gables,
      </span>
      <span className="text-gray-400">FL 33134 USA</span>
    </div>
  )
}

function Copyright() {
  return (
    <div className="mx-8 mt-auto flex w-full justify-start border-t-2 border-gray-300 py-5 font-medium">
      <span>2023 furino. All rights reverved</span>
    </div>
  )
}
