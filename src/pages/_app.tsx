import { HeaderComponent } from '@/components/Header'
import { globalStyles } from '@/styles/global'
import { Container, Content } from '@/styles/pages/app'
import type { AppProps } from 'next/app'
import { CartProvider } from 'use-shopping-cart'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider
      cartMode="checkout-session"
      stripe={process.env.STRIPE_PUBLIC_KEY as string}
      currency="BRL"
      shouldPersist
    >
      <Container>
        <HeaderComponent />

        <Content>
          <Component {...pageProps} />
        </Content>
      </Container>
    </CartProvider>
  )
}
