import { useEffect, useState } from "react"
import styles from "./ProductsDetails.module.scss"
import { productCtrl } from "@/api"
import { Loading } from "@/components/shared"
import { map } from "lodash"
import { Image } from "semantic-ui-react"
import { fn } from "@/utils"

export const ProductsDetails = ({ productsOrder }) => {

    const [products, setProducts] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        ( async() => {
            try {
                setLoading( true )
                const productsTemp = []

                for await ( const item of productsOrder ) {
                    const response = await productCtrl.getById( item.odProdId )
                    productsTemp.push({ ...response, odQuantity: item.odQuantity })                    
                }

                setProducts( productsTemp )     
                setLoading(false)           
            } catch (err) {
                console.log(err)
                setLoading(false)
            }
        })()
    }, [ productsOrder ])
    
    if ( loading ) return <Loading text="Cargando productos" />

    return (
        <div>
            { map(products, (product) => (
                <div key={ product.prodID } className={ styles.product }>
                    <div>
                        <Image src={ fn.getUrlImage( product.prodID ) } alt={ product.prodTitle } />
                        <div>
                            <h4>{ product.prodTitle }</h4>
                        </div>
                    </div>

                    <p className={ styles.price }>
                        { product.odQuantity } x { product.prodPrice }
                    </p>
                </div>    
            ))}
        </div>        
    )
}
