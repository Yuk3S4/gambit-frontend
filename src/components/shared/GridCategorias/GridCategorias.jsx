import Link from "next/link"
import { Image } from "semantic-ui-react"
import { data } from "./GridCategorias.data"
import styles from "./GridCategorias.module.scss"
import { map } from "lodash"

export const GridCategorias = () => {

    
  return (
    <div className={ styles.container }>
        { map( data, ( category ) => (              
            <Link key={ category.id } href={ category.link }>
                <div className={ styles.category }>
                    <Image src={ category.image } alt={ category.title } />
                    <h3>{ category.title }</h3>
                </div>
            </Link>            
        )) }
    </div>    
  )
}
