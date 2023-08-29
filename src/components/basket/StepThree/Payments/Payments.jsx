import { map } from "lodash"
import classNames from "classnames"
import { paymentsData } from "./Payments.data"
import styles from "./Payments.module.scss"

export const Payments = ({ paymentSelected, setPaymentSelected }) => {
    

    return (
        <div className={ styles.payments }>
            <h2>Métodos de pago</h2>
            <p>*Selecciona el método de pago que desees</p>

            { map( paymentsData, ( item ) => (
                <div 
                    key={ item.id }
                    className={classNames( styles.payment, {
                        [styles.selected]: item.id === paymentSelected?.id
                    })}
                    onClick={ () => setPaymentSelected( item ) }
                >
                    <div>
                        <p className={ styles.name }>{ item.name }:</p>
                        <p className={ styles.description }>{ item.description }</p>
                    </div>
                </div>    
            ))}
        </div>
    )
}
