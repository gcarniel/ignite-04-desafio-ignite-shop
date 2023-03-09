import { Cart, Header } from '@/styles/pages/app'
import Image from 'next/image'
import Link from 'next/link'
import { Handbag } from 'phosphor-react'
import { MouseEvent, useState } from 'react'
import { Bag } from '../Bag'

import logo from '../../assets/logo.svg'
import { useShoppingCart } from 'use-shopping-cart'

export function HeaderComponent() {
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
    <Header>
      <Link href={'/'}>
        <Image src={logo} alt="" />
      </Link>
      <Cart onClick={handleShowBag}>
        <Handbag size={32} weight="bold" />
        <div>{cartCount}</div>

        {showBag && <Bag closeBag={handleCloseBag} />}
      </Cart>
    </Header>
  )
}
