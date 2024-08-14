import { type ReactNode } from 'react'

import { CustomerSupportIcon } from './icons/customer-support'
import { GuaranteeIcon } from './icons/guarantee'
import { ShippignIcon } from './icons/shippign'
import { TrophyIcon } from './icons/trophy'

function BannerCertificates() {
  return (
    <div className="mt-8 flex min-h-56 items-center bg-[#FAF3EA] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-20">
          <Feature
            icon={<TrophyIcon />}
            title="High Quality"
            description="Crafted from top materials"
          />
          <Feature
            icon={<GuaranteeIcon />}
            title="Warranty Protection"
            description="Over 2 years"
          />
          <Feature
            icon={<ShippignIcon />}
            title="Free Shipping"
            description="Order over $150"
          />
          <Feature
            icon={<CustomerSupportIcon />}
            title="24/7 Support"
            description="Dedicated support"
          />
        </div>
      </div>
    </div>
  )
}

interface FeatureProps {
  icon: ReactNode
  title: string
  description: string
}

const Feature = ({ icon, title, description }: FeatureProps) => (
  <div className="flex items-start">
    <div className="flex-shrink-0">{icon}</div>
    <div className="ml-3">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  </div>
)

export { BannerCertificates }
