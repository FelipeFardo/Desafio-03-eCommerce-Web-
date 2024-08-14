import type { Product } from '@/@types/product'

import * as ProductCard from './product-card'

interface ColletionProductsProps {
  products: Product[]
}

export function ColletionProducts({ products }: ColletionProductsProps) {
  return (
    <div className="mx-auto mt-10 flex max-w-[1400px] flex-wrap justify-center gap-8">
      {products.map((product) => (
        <ProductCard.Root key={product.id}>
          <ProductCard.CardHover />
          {product.discountPrice && (
            <ProductCard.DiscountProduct percentual={product.discountPrice} />
          )}
          {product.new && !product.priceOld && <ProductCard.NewProduct />}
          <ProductCard.Image url={product.imageUrl} alt="Imagem" />
          <ProductCard.Content>
            <ProductCard.Title name={product.name} />
            <ProductCard.Description>
              {product.description}
            </ProductCard.Description>
            <ProductCard.ContentPrice>
              <ProductCard.Price priceInCents={product.price} />
              {product.priceOld && (
                <ProductCard.PriceOld priceOldInCents={product.priceOld} />
              )}
            </ProductCard.ContentPrice>
          </ProductCard.Content>
        </ProductCard.Root>
      ))}
    </div>
  )
}
