import { useRouter } from "next/router"
import styles from "./HeaderBasket.module.scss"
import { Logo } from "../Logo"
import { map } from "lodash"
import { Icon } from "semantic-ui-react"
import classNames from "classnames"

export const HeaderBasket = () => {

    const { query : { step = 1 } } = useRouter()
    const currentStep = +step
    
    const steps = [
        { number: 1, title: "Cesta" },
        { number: 2, title: "Dirección de envío" },
        { number: 3, title: "Método de pago" },
        { number: 4, title: "Confirmación" },
    ]

    return (
        <div className={ styles.container }>
            <div className={ styles.left }>
                <Logo />
            </div>

            <div className={ styles.center }>
                { map( steps, (step) => (
                    <div 
                    key={ step.number } 
                    className={ classNames({
                        [styles.active]: step.number === currentStep,
                        [styles.success]: step.number < currentStep,
                    })}>
                        <span className={ styles.number }>
                            <Icon name="check" />
                            { step.number}
                        </span> 
                        <span>{ step.title }</span>    
                        <span className={ styles.space }></span>                   
                    </div>    
                ))}
            </div>

            <div className={ styles.right }>

            </div>
        </div>
    )
}
