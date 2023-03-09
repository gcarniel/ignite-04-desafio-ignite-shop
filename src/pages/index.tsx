import { GetStaticProps } from 'next'
import { HomeContainer, Product, ProductWrapper } from '@/styles/pages/home'
import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css'

import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import Link from 'next/link'
import Head from 'next/head'
import { CaretRight, Handbag } from 'phosphor-react'
import { Caret } from '@/styles/pages/home'
import { useShoppingCart } from 'use-shopping-cart'

interface HomeProps {
  products: ProductType[]
}

export interface ProductType {
  id: string
  name: string
  imageUrl: string
  price: string
  priceRaw: number
  description: string
  defaultPriceId?: string
}

export default function Home({ products }: HomeProps) {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  const cart = useShoppingCart()
  const { addItem } = cart

  const handleAddItem = (product: ProductType) => {
    const productStripe = {
      sku: `sku_${product.name}`,
      currency: 'BRL',
      price: Number(product.priceRaw),
      image: product.imageUrl,
      name: product.name,
      defaultPriceId: product.defaultPriceId,
    }

    addItem(productStripe)
  }

  return (
    <>
      <Head>
        <title>Ignite Shop</title>
      </Head>

      <ProductWrapper>
        <Caret
          id="caret-left"
          pos={'left'}
          onClick={() => instanceRef.current?.prev()}
        >
          <CaretRight size={32} color="white" />
        </Caret>

        <HomeContainer ref={sliderRef} className="keen-slider">
          {products.map((product) => {
            return (
              <Product className="keen-slider__slide" key={product.id}>
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  prefetch={false}
                >
                  <Image
                    src={product.imageUrl}
                    width={520}
                    height={480}
                    alt=""
                  />
                </Link>
                <footer>
                  <div>
                    <strong>{product.description}</strong>
                    <span>{product.price}</span>
                  </div>
                  <span onClick={() => handleAddItem(product)}>
                    <Handbag size={24} />
                  </span>
                </footer>
              </Product>
            )
          })}
        </HomeContainer>

        <Caret
          id="caret-right"
          pos={'right'}
          onClick={() => instanceRef.current?.next()}
        >
          <CaretRight size={32} color="white" />
        </Caret>
      </ProductWrapper>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      priceRaw: price.unit_amount as number,
      defaultPriceId: price.id,
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format((price.unit_amount as number) / 100),
      description: product.description,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
