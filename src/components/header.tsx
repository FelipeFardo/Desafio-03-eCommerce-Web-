import { LogIn } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import furniroLogo from '@/assets/furniro.svg'

import { Button } from './button'
import { Cart } from './cart'

export function Header() {
  const navigate = useNavigate()

  const redirectToLogin = () => {
    navigate('/auth')
  }
  return (
    <header className="mx-auto flex w-full px-2  py-8  lg:pl-12">
      <div className="flex w-full items-center justify-between">
        <button className="hidden lg:block ">
          <img width={150} src={furniroLogo} alt="" />
        </button>
        <nav className="flex sm:gap-10">
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
          <LogIn onClick={redirectToLogin} className="cursor-pointer" />
          <Cart />
        </nav>
      </div>
    </header>
  )
}
