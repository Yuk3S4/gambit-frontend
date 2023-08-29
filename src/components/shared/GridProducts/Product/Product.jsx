import { useEffect, useState } from "react"
import Link from "next/link"

import classNames from "classnames"
import { Image } from "semantic-ui-react"

import styles from "./Product.module.scss"
import { fn } from "@/utils"

const NOT_FOUND_IMAGE = "/assets/not-found.jpg"

export const Product = ({ product, classProduct }) => {

    const [image, setImage] = useState(NOT_FOUND_IMAGE) 
    const lowStock = product.prodStock > 0 && product.prodStock < 10

    useEffect(() => {
        const imageUrl = fn.getUrlImage( product.prodID )
        fn.checkImageExists( imageUrl, (exists) => {
            if ( exists ) setImage( imageUrl )
        })
    }, [ product ])
    

    return (
        <div className={ classNames(styles.container, {
            [classProduct]: classProduct,
        })}>
            <Link href={ `/product/${ product.prodPath }` } >
                <div className={ styles.content }>
                    <Image src={ image } alt={ product.prodTitle } />
                    <h3>{ product.prodTitle }</h3>                    

                    <div className={ styles.footer }>
                        <span>${ product.prodPrice }</span>
                    </div>

                    { lowStock && (
                        <p className={ styles.lowStock }>
                            { `Sólo quedan ${ product.prodStock } unidades` }
                        </p>    
                    ) }
                </div>
            </Link>
        </div>                
    )
}
