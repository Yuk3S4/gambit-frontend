import { useEffect, useState } from "react"
import styles from "./AddressDetails.module.scss"
import { addressCtrl } from "@/api"
import { Loading } from "@/components/shared"

export const AddressDetails = ({ addressId }) => {

    const [address, setAddress] = useState(null)

    useEffect(() => {
        ( async() => {
            try {
                const response = await addressCtrl.getById( addressId )
                setAddress(response)                
            } catch (err) {
                console.log(err)
            }
        })()
    }, [addressId])
    

    if ( !address ) return <Loading text="Cargando dirección" />

    return (
        <div className={ styles.container }>
            <h4>Dirección de envio:</h4>
            <div className={ styles.address }>
                <p className={ styles.title }>
                    { address.addTitle }
                </p>
                <p className={ styles.addressInfo }>
                    { address.addName }, { address.addAddress }, { address.addState }, { address.addCity }, { address.addPostalCode }
                </p>
            </div>
        </div>        
    )
}
