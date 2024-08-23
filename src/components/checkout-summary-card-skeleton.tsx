export function CheckoutSummaryCardSkeleton() {
  return (
    <div>
      <div className="mb-4 flex justify-between">
        <div className="h-6 w-32 animate-pulse rounded bg-gray-300"></div>
        <div className="h-6 w-24 animate-pulse rounded bg-gray-300"></div>
      </div>

      <ul>
        {Array.from({ length: 3 }).map((_, index) => (
          <li key={index} className="mb-4 flex justify-between">
            <div className="flex items-center">
              <div className="h-6 w-40 animate-pulse rounded bg-gray-300"></div>
              <div className="ml-4 h-4 w-8 animate-pulse rounded bg-gray-300"></div>
            </div>
            <div className="h-6 w-16 animate-pulse rounded bg-gray-300"></div>
          </li>
        ))}
      </ul>

      <div className="text-md mb-4 flex justify-between">
        <div className="h-6 w-24 animate-pulse rounded bg-gray-300"></div>
        <div className="h-6 w-16 animate-pulse rounded bg-gray-300"></div>
      </div>

      <div className="text-md flex justify-between border-b-2 pb-4">
        <div className="h-6 w-16 animate-pulse rounded bg-gray-300"></div>
        <div className="h-8 w-24 animate-pulse rounded bg-gray-300"></div>
      </div>
    </div>
  )
}
