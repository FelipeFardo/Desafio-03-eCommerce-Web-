import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { LogIn, LogOut, User2Icon } from 'lucide-react'
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
            <>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <User2Icon />
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content className="mx-16 w-auto rounded-2xl border-2 border-yellow-900 bg-white  p-2 shadow-lg hover:bg-yellow-900 hover:text-white">
                    <button
                      onClick={() => logout()}
                      className="flex space-x-4 "
                    >
                      <LogOut />
                      <span>Logout</span>
                    </button>
                    <DropdownMenu.Arrow />
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </>
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
