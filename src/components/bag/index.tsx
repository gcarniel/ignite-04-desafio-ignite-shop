import { formatMoney } from '@/helpers/formatMoney'
import {
  BagContainer,
  Close,
  Footer,
  ImageWrapper,
  Products,
} from '@/styles/components/bag'
import axios from 'axios'
import Image from 'next/image'
import { X } from 'phosphor-react'
import { MouseEvent, useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart'

interface BagProps {
  closeBag: (event: MouseEvent<HTMLDivElement>) => void
}
export function Bag({ closeBag }: BagProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  const cart = useShoppingCart()

  const { removeItem, cartDetails, clearCart, totalPrice, cartCount } = cart

  const cartItems = Object.values(cartDetails || {})
  const countCart =
    cartCount && cartCount > 1 ? `${cartCount} itens` : `${cartCount} item`

  const totalPriceCart = totalPrice ? formatMoney(totalPrice) : 0

  const handleRemoveItem = (id: string) => removeItem(id)

  const handleFinishBuy = async () => {
    try {
      const cartItems = Object.values(cart.cartDetails || {})
      const lineItems = cartItems?.map((item: any) => {
        return {
          price: item.defaultPriceId,
          quantity: item.quantity,
        }
      })
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        lineItems,
      })

      const { checkoutUrl } = await response.data

      clearCart()

      window.location.href = checkoutUrl
    } catch (error) {
      alert('Erro ao redirecionar ao checkout!')
      setIsCreatingCheckoutSession(false)
    }
  }
  return (
    <BagContainer>
      <Close onClick={(event) => closeBag(event)}>
        <X size={24} weight="bold" />
      </Close>

      <h1>Sacola de compras</h1>

      <Products>
        {cartItems.map((item) => {
          return (
            <div key={item.id}>
              <ImageWrapper className="teste">
                <Image src={item.image || ''} width={100} height={93} alt="" />
                <span>{item.quantity}</span>
              </ImageWrapper>
              <div>
                <span>{item.name}</span>
                <strong>{item.formattedPrice}</strong>
                <button onClick={() => handleRemoveItem(item.id)}>
                  Remover
                </button>
              </div>
            </div>
          )
        })}
      </Products>

      <Footer>
        <div>
          <span>Quantidade</span>
          <span>{countCart}</span>
        </div>

        <div>
          <strong>Valor Total</strong>
          <strong>{totalPriceCart}</strong>
        </div>
        <button disabled={isCreatingCheckoutSession} onClick={handleFinishBuy}>
          Finalizar Compra
        </button>
      </Footer>
    </BagContainer>
  )
}
