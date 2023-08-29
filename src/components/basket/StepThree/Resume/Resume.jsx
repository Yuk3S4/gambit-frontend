import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import { forEach } from "lodash"
import { Button } from "semantic-ui-react"

import styles from "./Resume.module.scss"
import { useBasket } from "@/hooks"
import { orderCtrl } from "@/api"

export const Resume = ({ products, address, nextDisabled = false }) => {

    const router = useRouter()
    const [total, setTotal] = useState(null)
    const [orderDetails, setOrderDetails] = useState([])
    const [loading, setLoading] = useState(false)
    const { deleteAllItems } = useBasket()

    useEffect(() => {
        let totalTemp = 0
        let orderDetailsTemp = []

        forEach( products, (product) => {
            totalTemp += product.prodPrice * product.quantity
            orderDetailsTemp.push({
                odProdId: product.prodID,
                odQuantity: product.quantity,
                odPrice: product.prodPrice,
            })
        })

        setTotal( totalTemp )
        setOrderDetails( orderDetailsTemp )
    }, [ products ])

    const onPay = async() => {
        try {
            
            setLoading(true)

            const data = {
                orderDate: new Date(),
                orderTotal: total,
                orderDetails: orderDetails,
                orderAddId: address.addId,
            }

            await orderCtrl.create( data )
            deleteAllItems()
            router.replace({ query: { ...router.query, step: 4 } })
            
        } catch (err) {
            console.log(err)
            setLoading( false )
        }
    }

  return (
    <div className={ styles.container }>
        <h2>Resumen</h2>

        <div className={ styles.prices }>
            <div>
                <span>Total</span>
                <span>${ total?.toFixed(2) }</span>
            </div>
        </div>

        <Button
            primary
            fluid
            disabled={ nextDisabled }
            loading={ loading }
            onClick={ onPay }
        >
            Paga
        </Button>
    </div>
  )
}
