import { createContext, useState, useEffect } from 'react'
import { basketCtrl } from '@/api'

export const BasketContext = createContext()

export const BasketProvider = ({ children }) => {

    const [basket, setBasket] = useState(null)
    const [total, setTotal] = useState( basketCtrl.count() )

    useEffect(() => {
        const response = basketCtrl.getAll()
        setBasket( response )
    }, [])
    
    const refreshBasket = () => {
        setTotal( basketCtrl.count() )
        setBasket( basketCtrl.getAll() )
    }
    
    const addBasket = ( productId ) => {
        basketCtrl.add( productId )
        refreshBasket()
    }

    const changeQuantityItem = ( productId, newQuantity ) => {
        basketCtrl.changeQuantity( productId, newQuantity )
        refreshBasket()
    }

    const deleteItem = ( productId ) => {
        basketCtrl.deleteItem( productId )
        refreshBasket()
    }

    const deleteAllItems = () => {
        basketCtrl.deleteAll()
        refreshBasket()
    }


    const data = {
        basket,
        addBasket,
        total,
        deleteItem,
        deleteAllItems,
        changeQuantityItem,
    }

    return (
        <BasketContext.Provider value={ data }>
            { children }
        </BasketContext.Provider>
    )
}
