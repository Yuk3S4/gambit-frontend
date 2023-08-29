
import { ENV } from '@/utils'
import { forEach } from 'lodash'

const getAll = () => {
    const response = localStorage.getItem(ENV.BASKET)

    if ( !response ) {
        return []
    } else {
        return JSON.parse( response )
    }
}

const add = ( productId ) => {
    const products = getAll()
    const objIndex = products.findIndex( product => product.id === productId)

    if ( objIndex < 0 ) { // El producto no existe en el carrito
        products.push({ id: productId, quantity: 1 })            
    } else { // El producto ya esta en el carrito - sólo se aumenta la cantidad
        const product = products[objIndex]
        products[objIndex].quantity = product.quantity + 1
    }

    localStorage.setItem(ENV.BASKET, JSON.stringify( products ))
}

const count = () => {
    const response = getAll()
    let countTemp = 0

    forEach( response, (item) => {
        countTemp += item.quantity
    })

    return countTemp
}

const changeQuantity = ( productId, newQuantity ) => {
    const products = getAll()
    const objIndex = products.findIndex( product => product.id === productId)

    products[objIndex].quantity = newQuantity
    
    localStorage.setItem( ENV.BASKET, JSON.stringify( products ) )
}

const deleteItem = ( productId ) => {
    const products = getAll()
    const updateProducts = products.filter( product => product.id !== productId)

    localStorage.setItem( ENV.BASKET, JSON.stringify( updateProducts ) )
}

const deleteAll = () => {
    localStorage.removeItem( ENV.BASKET )
}

export const basketCtrl = {
    getAll,
    add,
    count,
    changeQuantity,
    deleteItem,
    deleteAll,
}