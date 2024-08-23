import bannerImage from '@/assets/images/banner.jpeg'
import * as Banner from '@/components/banner'
import { BannerCertificates } from '@/components/banner-certificates'
import * as FilterComponent from '@/components/filter'
import { PaginationHome } from '@/components/pagination-home'
import { ProductHome } from '@/components/product-home'

export function HomePage() {
  return (
    <>
      <Banner.Root>
        <Banner.Image imageUrl={bannerImage} />
        <Banner.Content className="flex space-y-4">
          <Banner.Title>Shop</Banner.Title>
          <Banner.Description className="flex items-center space-x-3 text-lg">
            <span className="font-bold"> Home</span>

            <span className="font-xs text-4xl">{'>'}</span>
            <span> Shop </span>
          </Banner.Description>
        </Banner.Content>
      </Banner.Root>
      <FilterComponent.Root>
        <FilterComponent.Content>
          <FilterComponent.FilterDetails />
          <FilterComponent.ItemsPerPage />
        </FilterComponent.Content>
      </FilterComponent.Root>
      <ProductHome />
      <PaginationHome />
      <BannerCertificates />
    </>
  )
}
