import { map, size } from "lodash"
import classNames from "classnames"
import { Loading } from "../Loading"
import { Separator } from "../Separator"
import styles from "./GridProducts.module.scss"
import { NoResult } from "../NoResult"
import { Product } from "./Product"

export const GridProducts = ({ products, columns = 4, classProduct }) => {

    if ( !products ) {
        return (
            <>
                <Separator height={50} />
                <Loading text="Cargando productos" />
                <Separator height={50} />
            </>    
        )
    }

    if ( size(products) === 0 ) return <NoResult text="No hay productos que mostrar" />

    return (
        <div className={ styles.container }>
            { map(products, ( product ) => (
                <div key={ product.prodID } className={ classNames(styles.product, {
                    [styles.oneColumn] : columns === 1,
                    [styles.twoColumns] : columns === 2,
                    [styles.threeColumns] : columns === 3,
                    [styles.fourColumns] : columns === 4,
                    [styles.fiveColumns] : columns === 5,
                    [styles.sixColumns] : columns === 6,
                }) }>
                    <Product product={ product } classProduct={ classProduct } />
                </div>    
            )) }
        </div>
    )
}
