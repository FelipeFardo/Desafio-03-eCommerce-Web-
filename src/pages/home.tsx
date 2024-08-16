import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { getProducts } from '@/api/get-products'
import bannerImage from '@/assets/images/banner.jpeg'
import * as Banner from '@/components/banner'
import { BannerCertificates } from '@/components/banner-certificates'
import * as FilterComponent from '@/components/filter'
import * as Pagination from '@/components/pagination'
import { CollectionProducts } from '@/components/product-list'
import { CollectionProductsSkeleton } from '@/components/products-list-skeleton'

export function HomePage() {
  const [
    searchParams,
    // ,setSearchParams
  ] = useSearchParams()
  const pageIndex = Number(searchParams.get('p') || 1)
  const perPage = Number(searchParams.get('perPage') || 20)

  const { data: result, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products', pageIndex, perPage],
    queryFn: () =>
      getProducts({
        perPage,
        pageIndex,
      }),
  })

  const products = result?.products

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
      {isLoadingProducts && <CollectionProductsSkeleton />}
      {products && <CollectionProducts products={products} />}
      <Pagination.Root>
        <Pagination.Button>2</Pagination.Button>
        <Pagination.Button>3</Pagination.Button>
        <Pagination.Button>4</Pagination.Button>
        <Pagination.Next />
      </Pagination.Root>
      <BannerCertificates />
    </>
  )
}
