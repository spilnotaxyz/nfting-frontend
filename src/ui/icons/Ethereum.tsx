import ethereum from './assets/ethereum.svg'
import Image, { ImageProps } from 'next/image'

export const Ethereum = (props: Partial<ImageProps>) => (
  <Image src={ethereum} alt="Ethereum" {...props} />
)
