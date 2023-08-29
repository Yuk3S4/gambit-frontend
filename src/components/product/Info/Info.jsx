import { Button } from "semantic-ui-react"
import styles from "./Info.module.scss"
import { useBasket } from "@/hooks"
import { useState } from "react"

export const Info = ({ product }) => {

  const { addBasket } = useBasket()
  const [loading, setLoading] = useState(false)

  const addBasketWrapper = () => {
    setLoading( true )
    addBasket( product.prodID )

    setTimeout(() => {
      setLoading( false )
    }, 500);
  }

  return (
    <div className={ styles.container }>
        <h1 className={ styles.title }>{ product.prodTitle }</h1>

        <span className={ styles.stock }>
            { `Quedan ${ product.prodStock } unidade/s` }
        </span>
        <span className={ styles.price }>${ product.prodPrice }</span>

        <Button
          onClick={ addBasketWrapper }
          primary
          className={ styles.btnBuy }
          loading={ loading }
        >
            Comprar
        </Button>
    </div>
  )
}
