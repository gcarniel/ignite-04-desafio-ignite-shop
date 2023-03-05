import { globalStyles } from '@/styles/global'
import { Cart, Container, Content, Header } from '@/styles/pages/app'
import type { AppProps } from 'next/app'
import Image from 'next/image'
import Link from 'next/link'
import { Handbag } from 'phosphor-react'

globalStyles()

import logo from '../assets/logo.svg'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Link href={'/'}>
          <Image src={logo} alt="" />
        </Link>
        <Cart>
          <Handbag size={32} weight="bold" />
        </Cart>
      </Header>

      <Content>
        <Component {...pageProps} />
      </Content>
    </Container>
  )
}
