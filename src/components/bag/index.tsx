import { BagContainer, Close, Footer, Products } from '@/styles/components/bag'
import Image from 'next/image'
import { X } from 'phosphor-react'
import { MouseEvent } from 'react'

interface BagProps {
  closeBag: (event: MouseEvent<HTMLDivElement>) => void
}
export function Bag({ closeBag }: BagProps) {
  return (
    <BagContainer>
      <Close onClick={(event) => closeBag(event)}>
        <X size={24} weight="bold" />
      </Close>

      <h1>Sacola de compras</h1>

      <Products>
        <Image src="" alt="" />
        <div>
          <span>Produto 1</span>
          <strong>79,90</strong>
          <button>Remover</button>
        </div>
      </Products>

      <Footer>
        <div>
          <span>Quantidade</span>
          <span>3 itens</span>
        </div>

        <div>
          <strong>Valor Total</strong>
          <strong>270</strong>
        </div>
        <button>Finalizar Compra</button>
      </Footer>
    </BagContainer>
  )
}
