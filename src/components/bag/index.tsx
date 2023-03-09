import { BagContainer, Close, Footer, Products } from '@/styles/components/bag'
import Image from 'next/image'
import { X } from 'phosphor-react'
import { MouseEvent } from 'react'
import { useShoppingCart } from 'use-shopping-cart'

interface BagProps {
  closeBag: (event: MouseEvent<HTMLDivElement>) => void
}
export function Bag({ closeBag }: BagProps) {
  const cart = useShoppingCart()

  const { removeItem, cartDetails, clearCart, totalPrice, cartCount } = cart

  const cartItems = Object.values(cartDetails || {})
  const countCart =
    cartCount && cartCount > 1 ? `${cartCount} itens` : `${cartCount} item`

  const totalPriceCart = totalPrice ? totalPrice / 100 : 0

  const handleRemoveItem = (id: string) => removeItem(id)
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
              <Image src={item.image || ''} width={100} height={93} alt="" />
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
        <button>Finalizar Compra</button>
      </Footer>
    </BagContainer>
  )
}
