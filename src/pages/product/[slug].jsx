import { useEffect, useState } from "react"
import { Container, Image } from "semantic-ui-react"

import { BasicLayout } from "@/layouts"
import styles from "./product.module.scss"
import { productCtrl } from "@/api"
import { fn } from "@/utils"
import { Separator } from "@/components/shared"
import { Product } from "@/components/product"
import { useBasket } from "@/hooks"

const NOT_FOUND_IMAGE = "/assets/not-found.jpg"

const ProductPage = ( props ) => {

    const { product } = props
    const { basket } = useBasket()

    console.log(basket);

    const [image, setImage] = useState( NOT_FOUND_IMAGE )

    useEffect(() => {
        const imageUrl = fn.getUrlImage( product.prodID )
        fn.checkImageExists( imageUrl, (exists) => {
            if ( exists ) setImage( imageUrl )
        })
    }, [ product ])

    return (
        <BasicLayout>
            <Container>
                <div className={ styles.product }>
                    <div>
                        <Image src={ image } alt={ product.prodTitle } />
                    </div>
                    <div>
                        <Product.Info product={ product } />
                    </div>
                </div>

                <Separator height={ 20 } />

                <Product.Description product={ product } />
            </Container>

            <Separator height={ 50 } />
        </BasicLayout>
    )
}

export default ProductPage

export const getServerSideProps = async (ctx) => {
    
    const { query : { search }, params : { slug } } = ctx

    // const ITEMS_PER_PAGE = 10

    if ( search ) {
        return { 
            props: { 
                products: "",
            } 
        }
    }

    try {
        const response = await productCtrl.getBySlug( slug )
        
        return {
            props: {
                product: response
            }
        }
    } catch (err) {
        return { props: { notFound: true } }
    }
}