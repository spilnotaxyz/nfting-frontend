import snow from './assets/snow.svg'
import Image, { ImageProps } from 'next/image'

export const Snow = (props: Partial<ImageProps>) => (
  <Image src={snow} alt="Snow" {...props} />
)
