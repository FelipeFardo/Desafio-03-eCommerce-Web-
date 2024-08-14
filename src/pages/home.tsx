import { productDB as products } from '@/api/products'
import bannerImage from '@/assets/images/banner.jpeg'
import * as Banner from '@/components/banner'
import { BannerCertificates } from '@/components/banner-certificates'
import * as FilterComponent from '@/components/filter'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import * as Pagination from '@/components/pagination'
import { ColletionProducts } from '@/components/product-list'
export function HomePage() {
  return (
    <>
      <Header />
      <Banner.Root>
        <Banner.Image imageUrl={bannerImage} />
        <Banner.Content className="flex space-y-4">
          <Banner.Title>Shop</Banner.Title>
          <Banner.Description className="space-x-3">
            <span className="text-lg font-bold"> Home</span>
            <span className="font-bold">{'>'}</span>
            <span className="text-lg"> Shop </span>
          </Banner.Description>
        </Banner.Content>
      </Banner.Root>
      <FilterComponent.Root>
        <FilterComponent.Content>
          <FilterComponent.FilterDetails />
          <FilterComponent.ItemsPerPage />
        </FilterComponent.Content>
      </FilterComponent.Root>
      <ColletionProducts products={products} />
      <Pagination.Root>
        <Pagination.Button>2</Pagination.Button>
        <Pagination.Button>3</Pagination.Button>
        <Pagination.Button>4</Pagination.Button>
        <Pagination.Next />
      </Pagination.Root>
      <BannerCertificates />
      <Footer />
    </>
  )
}
