import { ENV, authFetcher } from '@/utils'

const createOrder = async(data) => {
    try {
        const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.ORDER }`
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( data )
        }

        const response = await authFetcher( url, params )
        
        if ( response.status !== 200 ) throw response

        return true
    } catch (err) {
        throw err
    }
}

const getAllOrders = async() => {
    try {
        const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.ORDER }`

        const response = await authFetcher( url )
        const result = await response.json()
        
        if ( response.status !== 200 ) throw response

        return result
    } catch (err) {
        throw err
    }
}

export const orderCtrl = {
    create: createOrder,
    getAll: getAllOrders,
}
