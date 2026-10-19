import { srcSet, url } from '../../data/images'

/**
 * Cropped, lazy, CLS-safe image. `ratio` applies from lg up; `mobileRatio`
 * (optional) below it, served via <picture> so phones get a properly cropped file.
 * `fill` makes it cover its positioned parent instead of setting an aspect ratio.
 */
export function ImageFrame({
  image,
  ratio = [4, 5],
  mobileRatio = ratio,
  sizes = '100vw',
  priority = false,
  fill = false,
  zoom = true,
  className = '',
  imgClassName = '',
}) {
  const height = (r, w = 1080) => Math.round((w * r[1]) / r[0])
  const img = (
    <img
      src={url(image, 1080, mobileRatio)}
      srcSet={srcSet(image, mobileRatio)}
      sizes={sizes}
      width={1080}
      height={height(mobileRatio)}
      alt={image.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      className={`h-full w-full object-cover ${zoom ? 'transition-transform duration-1200 ease-lux group-hover:scale-105' : ''} ${imgClassName}`}
    />
  )
  return (
    <div
      className={`group overflow-hidden bg-linen ${fill ? 'absolute inset-0' : 'relative aspect-(--r-m) lg:aspect-(--r)'} ${className}`}
      style={{ '--r-m': mobileRatio.join('/'), '--r': ratio.join('/') }}
    >
      {mobileRatio === ratio ? (
        img
      ) : (
        <picture className="block h-full w-full">
          <source media="(min-width: 1024px)" srcSet={srcSet(image, ratio)} sizes={sizes} width={1080} height={height(ratio)} />
          {img}
        </picture>
      )}
    </div>
  )
}
