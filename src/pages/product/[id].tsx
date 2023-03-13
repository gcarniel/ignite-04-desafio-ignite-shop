import { formatMoney } from '@/helpers/formatMoney'
import { stripe } from '@/lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/styles/pages/products'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Stripe from 'stripe'
import { useShoppingCart } from 'use-shopping-cart'
import { ProductType } from '..'

interface ProductProps {
  product: ProductType
}

export default function Product({ product }: ProductProps) {
  const { addItem } = useShoppingCart()

  const handleBuyProduct = async () => {
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
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>

          <span>{product.price}</span>

          <p>{product.description}</p>

          <button onClick={handleBuyProduct}>Colocar na sacola</button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_NPebXR0KfnIzlJ' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id as string

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        description: product.description,
        defaultPriceId: price.id,
        priceRaw: price.unit_amount as number,
        price: formatMoney(price.unit_amount as number),
      },
    },
    revalidate: 60 * 60 * 1, // 1 hora
  }
}
