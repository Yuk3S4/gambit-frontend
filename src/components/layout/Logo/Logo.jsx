import Link from 'next/link'
import { Image } from 'semantic-ui-react'

export const Logo = () => {
  return (
    <Link href="/">
      <Image src="/assets/logo-texto.png" alt="Gambit" />
    </Link>
  )
}
