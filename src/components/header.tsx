import { LogIn, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'

import furniroLogo from '@/assets/furniro.svg'
import { useAuth } from '@/contexts/useAuth'

import { Button } from './button'
import { Cart } from './cart'

export function Header() {
  const { isAuth, logout } = useAuth()

  return (
    <header className="mx-auto flex w-full px-2  py-8 pl-8 lg:pl-12">
      <div className="flex w-full items-center justify-between">
        <button className="hidden lg:block ">
          <Link to="/">
            <img width={150} src={furniroLogo} alt="" />
          </Link>
        </button>
        <nav className="flex sm:gap-10">
          <Link
            to="/"
            className="flex items-center  justify-center font-medium"
          >
            Home
          </Link>
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
        <nav className="flex w-32 space-x-8 lg:w-40">
          {isAuth && (
            <button onClick={() => logout()} className="flex space-x-4">
              <LogOut />
            </button>
          )}

          {!isAuth && (
            <Link to="/auth" className="flex space-x-4">
              <LogIn />
            </Link>
          )}
          <Cart />
        </nav>
      </div>
    </header>
  )
}
