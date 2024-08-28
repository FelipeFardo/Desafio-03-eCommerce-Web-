type Size = {
  id: string
  productId: string
  name: string
  size: string
}

export function sorteSizes(sizes: Size[]) {
  const sizeOrder = ['XS', 'S', 'M', 'L', 'XL']

  const compareSizes = (a: Size, b: Size) => {
    const indexA = sizeOrder.indexOf(a.size)
    const indexB = sizeOrder.indexOf(b.size)

    return indexA - indexB
  }

  const sortedSizes = sizes.sort(compareSizes)

  return sortedSizes
}
