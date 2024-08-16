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
    <div className="mx-auto mt-10 flex max-w-[1500px] flex-wrap justify-center gap-8">
      {products.map((product) => (
        <ProductCard.Root key={product.id}>
          <ProductCard.CardHover />
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
    </div>
  )
}
