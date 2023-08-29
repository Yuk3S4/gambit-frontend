import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "semantic-ui-react"

import styles from "./Addresses.module.scss"
import { addressCtrl } from "@/api"
import { map, size } from "lodash"
import { useAuth } from "@/hooks"
import { Loading, NoResult } from "@/components/shared"
import classNames from "classnames"

export const Addresses = ({ address, setAddress }) => {

    const [addresses, setAddresses] = useState(null)
    const { user } = useAuth()

    useEffect(() => {
        ( async() => {
            try {
                const response = await addressCtrl.getAll()
                setAddresses( response )
            } catch (err) {
                console.log(err)
            }
        })()
    }, [user])
    
        
    return (
        <div className={ styles.addresses }>
            <h2>Dirección de envío</h2>
            <p>*Selecciona a donde te llegará tu pedido</p>
            
            { !addresses && <Loading text="Cargando direcciones" /> }

            { addresses && size( addresses ) === 0 && (
                <div className={ styles.noAdresses }>
                    <NoResult text="No tienes ninguna dirección registrada" />
                    <Button
                        as={ Link }
                        href="/account"
                        primary
                    >
                        Crea una dirección
                    </Button>
                </div>    
            )}

            { map( addresses, ( addr ) => (
                <div 
                    onClick={ () => setAddress( addr ) }
                    key={ addr.addId } 
                    className={ classNames( styles.address, {
                        [styles.selected]: addr.addId === address?.addId,
                    } ) }
                >
                    <div>
                        <p className={ styles.title }>{ addr.addTitle }</p>
                        <p className={ styles.addressInfo }>
                            { addr.addName }, { addr.addAddress }, { addr.addState }, { addr.addCity }, { addr.addPostalCode }
                        </p>
                    </div>
                </div>    
            ))}
        </div>
    )
}
