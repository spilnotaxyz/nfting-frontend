import logo from './assets/logo.svg'
import Image from 'next/image'

export const Logo = () => (
  <Image src={logo} alt="Spilnota" height={22} width="100%" />
)
