export function ProductSkeleton() {
  return (
    <div className="6 container mx-auto flex animate-pulse flex-wrap lg:flex-nowrap">
      <div className="mx-auto flex flex-row gap-4 p-4 md:flex-col lg:mx-0 lg:w-1/6 lg:p-0">
        {Array(4)
          .fill('')
          .map((_, index) => (
            <div key={index} className="h-24 w-24 rounded-xl bg-gray-300" />
          ))}
      </div>
      <div className="mx-auto flex w-3/4 max-w-[300px] justify-center pl-4 sm:block md:max-w-[500px] lg:max-w-[800px]">
        <div className="h-[300px] w-full rounded-xl bg-gray-300"></div>
      </div>
      <div className="mt-6 w-full pl-16">
        <div className="h-8 w-3/4 rounded bg-gray-300"></div>
        <div className="mt-4 h-6 w-1/4 rounded bg-gray-300"></div>
        <div className="mt-2 flex items-center">
          <div className="h-6 w-20 rounded bg-gray-300"></div>
        </div>
        <div className="mt-4 h-20 w-full rounded bg-gray-300"></div>
        <div className="mt-4">
          <div className="mb-4">
            <div className="h-6 w-20 rounded bg-gray-300"></div>
            <div className="mt-2 flex space-x-4">
              {Array(3)
                .fill('')
                .map((_, index) => (
                  <div
                    key={index}
                    className="h-10 w-10 rounded-2xl bg-gray-300"
                  />
                ))}
            </div>
          </div>
          <div className="mb-4">
            <div className="h-6 w-20 rounded bg-gray-300"></div>
            <div className="mt-2 flex space-x-4">
              {Array(3)
                .fill('')
                .map((_, index) => (
                  <div
                    key={index}
                    className="h-10 w-10 rounded-full bg-gray-300"
                  />
                ))}
            </div>
          </div>
          <div className="mb-4 flex items-center space-x-4">
            <div className="flex w-auto items-center rounded-2xl border-2 border-gray-300">
              <div className="h-10 w-10 rounded-l-xl bg-gray-300"></div>
              <div className="h-10 w-16 bg-gray-300"></div>
              <div className="h-10 w-10 rounded-r-xl bg-gray-300"></div>
            </div>
            <div className="h-10 w-56 rounded-2xl bg-gray-300"></div>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-4 border-t-2 border-gray-200 py-8">
          <div className="h-6 w-1/4 rounded bg-gray-300"></div>
          <div className="h-6 w-1/4 rounded bg-gray-300"></div>
          <div className="h-6 w-1/4 rounded bg-gray-300"></div>
          <div className="h-6 w-1/4 rounded bg-gray-300"></div>
        </div>
      </div>
    </div>
  )
}
