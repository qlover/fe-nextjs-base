import Image, { ImageProps } from 'next/image'
import { forwardRef } from 'react'

export type ImgProps = ImageProps

/**
 * img 组件
 *
 * 1. 支持 css 定义图片尺寸
 * 2. 支持图片 src 相对路径
 *
 * @returns
 */
const Img = forwardRef<HTMLImageElement, Component.WithChildren<ImgProps>>(
  ({ className, src, loading = 'lazy', ...props }, ref) => {
    return (
      <Image
        ref={ref}
        src={src}
        loading={loading}
        className={className}
        title=""
        width={200}
        height={200}
        {...props}
        alt={props.alt}
      />
    )
  }
)

Img.displayName = 'Img'

export default Img
