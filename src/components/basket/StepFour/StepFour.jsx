import Link from "next/link"
import { Button, Container, Icon } from "semantic-ui-react"
import styles from "./StepFour.module.scss"

export const StepFour = () => {



  return (
    <Container className={ styles.container }>
      <Icon name="check circle outline" />
      <h2>¡Compra exitosa!</h2>
      
      <Button
        as={ Link }
        href="/account"
        primary
      >
        Ve tu pedido
      </Button>
    </Container>
  )
}
