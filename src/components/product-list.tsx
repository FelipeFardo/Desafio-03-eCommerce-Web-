import { cn } from '@/lib/utils'

import * as ProductCard from './product-card'

interface CollectionProductsProps {
  productVariants: {
    id: string
    productId: string
    sizeId: string
    colorId: string
    sku: string
    quantity: 7
    color: {
      id: string
      productId: string
      name: string
      color: string
    }
    size: {
      id: string
      productId: string
      name: string
      size: string
    }
    product: {
      id: string
      name: string
      slug: string
      description: string
      categoryId: string
      createdAt: string
      colors: {
        id: string
        productId: string
        name: string
        color: string
      }[]
      sizes: {
        id: string
        productId: string
        name: string
        size: string
      }[]
    }
    image: {
      id: string
      title: string
      url: string
      productId: string
    }
    discount: number | null
    isNew: boolean
    priceInCents: number
    oldPriceInCents: number | null
  }[]
}

export function CollectionProducts({
  productVariants,
}: CollectionProductsProps) {
  return (
    <>
      {productVariants.map((productVariant) => (
        <ProductCard.Root key={productVariant.id}>
          <ProductCard.CardHover
            productSlug={productVariant.product.slug}
            sku={productVariant.sku}
          />
          {productVariant.discount && (
            <ProductCard.DiscountProduct percentual={productVariant.discount} />
          )}
          {productVariant.isNew && !productVariant.discount && (
            <ProductCard.NewProduct />
          )}
          <ProductCard.ImageCard url={productVariant.image.url} alt="Imagem" />
          <ProductCard.Content>
            <ProductCard.Title name={productVariant.product.name} />
            <div className="space-y-2">
              <div className="flex space-x-4">
                {productVariant.product.sizes.map((size) => {
                  return (
                    <span
                      key={size.size}
                      className={cn(
                        'flex h-6 w-6 items-center justify-center rounded-2xl',
                        size.id === productVariant.sizeId
                          ? ' bg-yellow-800 text-white'
                          : 'opacity-50',
                      )}
                    >
                      {size.size}
                    </span>
                  )
                })}
              </div>
              <div className="flex space-x-4">
                {productVariant.product.colors.map((color) => {
                  return (
                    <span
                      key={color.color}
                      className={cn(
                        'h-6 w-6 rounded-full border-2 border-black ',
                        color.id === productVariant.colorId
                          ? 'opacity-100'
                          : 'opacity-40',
                      )}
                      style={{ backgroundColor: color.color }}
                    ></span>
                  )
                })}
              </div>
            </div>
            <ProductCard.Description>
              {productVariant.product.description}
            </ProductCard.Description>
            <div>
              <ProductCard.ContentPrice>
                <ProductCard.Price priceInCents={productVariant.priceInCents} />
                {productVariant.oldPriceInCents && (
                  <ProductCard.PriceOld
                    priceOldInCents={productVariant.oldPriceInCents}
                  />
                )}
              </ProductCard.ContentPrice>
            </div>
          </ProductCard.Content>
        </ProductCard.Root>
      ))}
    </>
  )
}
