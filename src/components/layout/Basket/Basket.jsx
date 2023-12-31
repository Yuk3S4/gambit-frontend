import Link from "next/link"
import { Icon, Label } from "semantic-ui-react"

import styles from "./Basket.module.scss"
import { useBasket } from "@/hooks"

export const Basket = () => {

  const { total } = useBasket()

  return (
    <Link href="/basket" className={ styles.basket }>
        <Icon name="cart" />
        { total > 0 && (
            <Label circular color="teal">
                { total }
            </Label>    
        )}
        Mi cesta
    </Link>
  )
}
