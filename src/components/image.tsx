import React, { useEffect, useState } from 'react'

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  fallbackSrc?: string
  alt?: string
}

export function Image({
  src,
  fallbackSrc = '/public/placeholder-product.png',
  alt,
  ...props
}: ImageProps) {
  const [imgSrc, setImgSrc] = useState(src)

  const handleError = () => {
    if (fallbackSrc) {
      setImgSrc(fallbackSrc)
    }
  }

  useEffect(() => {
    setImgSrc(src)
  }, [src])

  return <img src={imgSrc} alt={alt} onError={handleError} {...props} />
}
