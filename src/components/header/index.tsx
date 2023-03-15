import { Cart, HeaderWrapper } from '@/styles/pages/app'
import Image from 'next/image'
import Link from 'next/link'
import { Handbag } from 'phosphor-react'
import { MouseEvent, useState } from 'react'

import logoShop from '../../assets/logo.svg'
import { useShoppingCart } from 'use-shopping-cart'
import { Bag } from '../bag'

export function Header() {
  const [showBag, setShowBag] = useState(false)
  const { cartCount = 0 } = useShoppingCart()

  const handleCloseBag = (event: MouseEvent) => {
    event.stopPropagation()
    setShowBag(false)
  }

  const handleShowBag = () => {
    setShowBag(true)
  }

  return (
    <HeaderWrapper>
      <Link href={'/'}>
        <Image src={logoShop} alt="" />
      </Link>
      <Cart onClick={handleShowBag}>
        <Handbag size={32} weight="bold" />
        <div>{cartCount}</div>

        {showBag && <Bag closeBag={handleCloseBag} />}
      </Cart>
    </HeaderWrapper>
  )
}
