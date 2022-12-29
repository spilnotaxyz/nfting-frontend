import randomize from './assets/randomize.svg'
import Image, { ImageProps } from 'next/image'

export const Randomize = (props: Partial<ImageProps>) => (
  <Image src={randomize} alt="Randomize" {...props} />
)
