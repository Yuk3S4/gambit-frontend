import { BasicLayout } from "@/layouts"
import styles from "./category.module.scss"
import { Container } from "semantic-ui-react"
import { Separator, GridProducts, Pagination } from "@/components/shared"
import { productCtrl } from "@/api"
import { size } from "lodash"

const CategoryPage = (props) => {

    const { products, pagination } = props
    const { page, totalPages } = pagination
        
    return (
        <BasicLayout>
            <Container>
                <Separator height={20} />
                <GridProducts products={ products } classProduct={ styles.product } />
                { size(products) > 0 && (
                    <Pagination currentPage={ page } totalPages={ totalPages } />    
                )}
            </Container>
        </BasicLayout>
    )
}

export default CategoryPage 

export const getServerSideProps = async (ctx) => {

    const { query : { page = 1, search }, params : { slug } } = ctx

    const ITEMS_PER_PAGE = 10

    if ( search ) {
        return { 
            props: { 
                products: "",
                pagination: "",
            } 
        }
    }

    try {
        const response = await productCtrl.getByCategorieSlug( slug, page, ITEMS_PER_PAGE )

        const products = response.data || []
        const totalPages = Math.ceil( response.totalItems / ITEMS_PER_PAGE )
        const pagination = { page, totalPages }

        return { 
            props: { 
                products,
                pagination 
            } 
        }
    } catch (err) {
        return { props: { notFound: true } }
    }
}