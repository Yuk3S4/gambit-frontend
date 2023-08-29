import { HeaderBasket } from "@/components/layout"
import styles from "./BasketLayout.module.scss"
import { Separator } from "@/components/shared"

export const BasketLayout = ({ children }) => {
  return (
    <div className={ styles.container }>
        <HeaderBasket />
        <Separator height={ 100 } />

        { children }
    </div>
  )
}
