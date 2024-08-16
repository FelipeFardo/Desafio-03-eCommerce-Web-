import { LogIn } from 'lucide-react'

import furniroLogo from '@/assets/furniro.svg'

import { Button } from './button'
import { Cart } from './cart'

export function Header() {
  return (
    <header className="mx-auto flex w-full px-12 py-8">
      <div className="flex w-full items-center justify-between">
        <button>
          <img width={150} src={furniroLogo} alt="" />
        </button>
        <nav className="flex gap-10">
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
          <LogIn />
          <Cart />
        </nav>
      </div>
    </header>
  )
}
