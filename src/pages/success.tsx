import { stripe } from '@/lib/stripe'
import {
  ImageContainer,
  ImageWrapper,
  SuccessContainer,
} from '@/styles/pages/success'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'

interface SuccessProps {
  customerName: string
  products: Product[]
}

interface Product {
  name: string
  imageUrl: string
}

export default function Success({ customerName, products }: SuccessProps) {
  const quantity = products.length
  const message =
    quantity > 1
      ? `suas ${quantity} camisetas já estão a caminho da sua casa`
      : `sua camiseta já está a caminho da sua casa`
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <ImageWrapper>
          {products.map((product) => {
            return (
              <ImageContainer key={product.name}>
                <Image src={product.imageUrl} width={100} height={100} alt="" />
              </ImageContainer>
            )
          })}
        </ImageWrapper>
        <h1>Compra efetuada!</h1>

        <p>
          Uhuul, <strong>{customerName}</strong>, {`${message}`}
        </p>

        <Link href={'/'}>Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details?.name

  const products = session.line_items?.data.map((product) => {
    const p = product.price?.product as Stripe.Product
    return {
      imageUrl: p.images[0],
      name: p.name,
    }
  })

  return {
    props: {
      customerName,
      products,
    },
  }
}
