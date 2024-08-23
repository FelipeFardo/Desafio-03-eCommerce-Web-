import * as ProductCard from './product-card'

interface CollectionProductsProps {
  products: {
    id: string
    isNew: boolean
    priceInCents: number
    oldPriceInCents: number | null
    name: string
    slug: string
    description: string
    category: string
    discount: number
    createdAt: Date
    image: {
      id: string
      title: string
      url: string
      productId: string
    }
  }[]
}

export function CollectionProducts({ products }: CollectionProductsProps) {
  return (
    <>
      {products.map((product) => (
        <ProductCard.Root key={product.id}>
          <ProductCard.CardHover productSlug={product.slug} />
          {product.discount && (
            <ProductCard.DiscountProduct percentual={product.discount} />
          )}
          {product.isNew && <ProductCard.NewProduct />}
          <ProductCard.Image url={product.image.url} alt="Imagem" />
          <ProductCard.Content>
            <ProductCard.Title name={product.name} />
            <ProductCard.Description>
              {product.description}
            </ProductCard.Description>
            <div>
              <ProductCard.ContentPrice>
                <ProductCard.Price priceInCents={product.priceInCents} />
                {product.oldPriceInCents && (
                  <ProductCard.PriceOld
                    priceOldInCents={product.oldPriceInCents}
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
