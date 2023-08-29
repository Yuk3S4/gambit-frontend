import { useEffect, useState } from 'react'

import styles from './ListAdresses.module.scss'
import { addressCtrl } from '@/api'
import { Loading, NoResult } from '@/components/shared'
import { map, size } from 'lodash'
import { Address } from './Address'

export const ListAdresses = ({ reload, onReload }) => {

    const [addresses, setAddresses] = useState(null)
    
    useEffect(() => {
        (async () => {
            try {
                const resp = await addressCtrl.getAll()
                setAddresses(resp)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [ reload ])
    
    if ( !addresses ) return <Loading text="Cargando direcciones" top={ 100 } />
        
    return (
        <div className={ styles.addresses }>

            { size( addresses ) == 0 && <NoResult text="Crea tu primera dirección" /> }

            { map( addresses, (address) => (
                <Address key={address.addId} address={ address } onReload={ onReload } />    
            )) }
            
        </div>
    )
}
