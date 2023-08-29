import { Container } from "semantic-ui-react"
import styles from "./StepTwo.module.scss"
import { Resume } from "../Resume"
import { Addresses } from "./Addresses"

export const StepTwo = ({ products, address, setAddress, nextDisabled }) => {
        
    return (
        <Container className={ styles.container }>
            <div className={ styles.left }>
                <Addresses
                    address={ address }
                    setAddress={ setAddress }
                />
            </div>
            <div className={ styles.right }>
            <Resume 
                products={ products } 
                nextStep={3}
                btnText="Proceder con el pago"
                nextDisabled={ nextDisabled }
            />
            </div>
        </Container>
    )
}
