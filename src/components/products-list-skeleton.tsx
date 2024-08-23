interface CollectionProductsSkeletonProps {
  qtd?: number
}
export function CollectionProductsSkeleton({
  qtd = 12,
}: CollectionProductsSkeletonProps) {
  return (
    <>
      {[...Array(qtd)].map((_, index) => (
        <div
          key={index}
          className="relative flex w-[17rem] max-w-[300px] flex-col "
        >
          <div className="relative">
            <div className="h-64 w-64 rounded-lg bg-gray-300"></div>
          </div>
          <div className="mt-4">
            <div className="h-4 w-48 rounded bg-gray-300"></div>
            <div className="mt-2 h-3 w-40 rounded bg-gray-300"></div>
            <div className="mt-4 h-5 w-24 rounded bg-gray-300"></div>
          </div>
        </div>
      ))}
    </>
  )
}
