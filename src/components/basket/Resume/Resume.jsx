import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { forEach } from "lodash"
import { Button } from "semantic-ui-react"
import styles from "./Resume.module.scss"

import { useAuth } from "@/hooks"
export const Resume = ({ products, nextStep, btnText, nextDisabled = false }) => {

    const router = useRouter()
    const [total, setTotal] = useState(null)
    const { user } = useAuth()

    useEffect(() => {
        let totalTemp = 0

        forEach( products, (product) => {
            totalTemp += product.prodPrice * product.quantity
        })
        setTotal( totalTemp )
    }, [ products ])

    const goToNextStep = () => {
        if ( user ) {
            router.replace({ query: { ...router.query, step: nextStep } })
        } else {
            router.push("/join/login")
        }
    }
    
    if ( !total ) return null

  return (
    <div className={ styles.container }>
        <h2>Resumen</h2>

        <div className={ styles.prices }>
            <div>
                <span>Total</span>
                <span>${ total.toFixed(2) }</span>
            </div>
        </div>

        <Button
            primary
            fluid
            disabled={ nextDisabled }
            onClick={ goToNextStep }
        >
            { btnText }
        </Button>
    </div>
  )
}
