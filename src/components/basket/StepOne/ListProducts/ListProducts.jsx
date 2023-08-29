import { Dropdown, Icon, Image } from "semantic-ui-react"
import styles from "./ListProducts.module.scss"
import { map } from "lodash"
import { fn } from "@/utils"
import { useBasket } from "@/hooks"

export const ListProducts = ({ products }) => {

    const options = Array.from({ length: 50 }, (_, index) => {
        const number = index + 1
        return { key: number, text: String(number), value: number }
    })

    const { changeQuantityItem, deleteItem } = useBasket()
        
    return (
        <div className={ styles.basket }>
            <h2>Cesta</h2>

            { map( products, (product) => (
                <div key={ product.prodID } className={ styles.product }>
                    <Image src={fn.getUrlImage( product.prodID )} alt={ product.prodTitle } />

                    <div>
                        <div className={ styles.info }>
                            <p>{ product.prodTitle }</p>
                        </div>

                        <div className={ styles.actions }>
                            <Dropdown
                                className="number"
                                options={ options }
                                selection
                                compact 
                                value={ product.quantity }
                                onChange={ (_, data ) => changeQuantityItem( product.prodID, data.value ) }
                            />
                            <span>${ product.prodPrice }</span>
                            <Icon 
                                name="trash alternate outline" 
                                link 
                                onClick={ () => deleteItem( product.prodID ) }
                            />
                        </div>
                    </div>
                </div>    
            ))}
        </div>
    )
}
