import { Bag } from '@/components/bag'
import { globalStyles } from '@/styles/global'
import { Cart, Container, Content, Header } from '@/styles/pages/app'
import type { AppProps } from 'next/app'
import Image from 'next/image'
import Link from 'next/link'
import { Handbag } from 'phosphor-react'
import { MouseEvent, useState } from 'react'

globalStyles()

import logo from '../assets/logo.svg'
export default function App({ Component, pageProps }: AppProps) {
  const [showBag, setShowBag] = useState(false)

  const handleCloseBag = (event: MouseEvent) => {
    event.stopPropagation()
    setShowBag(false)
  }

  const handleShowBag = () => {
    setShowBag(true)
  }

  return (
    <Container>
      <Header>
        <Link href={'/'}>
          <Image src={logo} alt="" />
        </Link>
        <Cart onClick={handleShowBag}>
          <Handbag size={32} weight="bold" />

          {showBag && <Bag closeBag={handleCloseBag} />}
        </Cart>
      </Header>

      <Content>
        <Component {...pageProps} />
      </Content>
    </Container>
  )
}
