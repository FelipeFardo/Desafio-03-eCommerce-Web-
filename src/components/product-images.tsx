import { useEffect, useState } from 'react'

interface ProductImagesProps {
  images: {
    id: string
    title: string
    url: string
    productId: string
  }[]
}

export function ProductImages({ images }: ProductImagesProps) {
  const [imageSelect, setImageSelect] = useState<{
    id: string
    title: string
    url: string
    productId: string
  }>()

  useEffect(() => {
    setImageSelect(images[0])
  }, [images])

  return (
    <>
      <div className="mx-auto flex flex-row  gap-4 p-4 md:flex-col  lg:mx-0 lg:w-1/6  lg:p-0">
        {images.map((image) => {
          return (
            <img
              key={image.url}
              src={image.url}
              alt={image.title}
              className="h-24 w-24 cursor-pointer rounded-xl object-cover"
              onClick={() => setImageSelect(image)}
            />
          )
        })}
      </div>

      <div className="mx-auto flex w-3/4 max-w-[300px] justify-center pl-4 sm:block md:max-w-[500px] lg:max-w-[800px]">
        <img
          src={imageSelect?.url}
          alt={imageSelect?.title}
          className="h-auto w-full rounded-xl object-cover"
        />
      </div>
    </>
  )
}
