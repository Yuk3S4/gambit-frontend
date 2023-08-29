import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import styles from "./SearchContext.module.scss"
import { Separator, GridProducts } from "@/components/shared"
import { productCtrl } from "@/api"

export const SearchProvider = ({ children }) => {
    
    const { query } = useRouter()

    const [products, setProducts] = useState(null)
    const [totalItems, setTotalItems] = useState(0)

    useEffect(() => {
        if ( query.search ) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "scroll"        
        }
    }, [ query.search ])
    
    useEffect(() => {
        (async() => {
            try {
                setProducts(null)
                const response = await productCtrl.getAll( 1, 100000, query.search )

                setProducts(response.data || [])
                setTotalItems( response.totalItems || 0 )
            } catch (err) {
                console.log(err)
            }
        })()
    }, [ query.search ])    
    
    return (
        <>
            { children }
            
            { query.search && (
                <div className={ styles.container }>
                    <div className={ styles.infoSearch }>
                        <p>Buscando: { query.search }</p>
                        <p>{ totalItems } { totalItems === 1 ? 'resultado': 'resultados'}</p>
                    </div>

                    <Separator height={20} />

                    <GridProducts
                        products={ products }
                        columns={ 6 }
                        classProduct={ styles.product }
                    />
                </div>    
            )}
        </>
    )
}
