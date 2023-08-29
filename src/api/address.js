import { ENV, authFetcher } from '@/utils'

const getAllAddresses = async() => {
    try {
        const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.ADDRESS }`
        
        const response = await authFetcher( url )
        const result = response.json()

        if ( response.status !== 200 ) return result

        return result
    } catch (err) {
        throw err
    }
}

export const createAddress = async( data ) => {
    try {
        const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.ADDRESS }`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( data )
        }
        
        const response = await authFetcher( url, params )

        if ( response.status !== 200 ) return response

        return true
    } catch (err) {
        throw err
    }
}

export const updateAddress = async( data, addressId ) => {
    try {
        const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.ADDRESS }/${ addressId }`
        const params = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( data )
        }
        
        const response = await authFetcher( url, params )

        if ( response.status !== 200 ) return response

        return true
    } catch (err) {
        throw err
    }
}

export const deleteAddress = async( addressId ) => {
    try {
        const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.ADDRESS }/${ addressId }`
        const params = {
            method: "DELETE"
        }
        
        const response = await authFetcher( url, params )

        if ( response.status !== 200 ) return response

        return true
    } catch (err) {
        throw err
    }
}

const getAddressById = async( addressId ) => {
    try {
        const filters = `addId=${ addressId }`
        const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.ADDRESS }?${ filters }`

        const response = await authFetcher( url )
        const result = await response.json()

        if ( response.status !== 200 ) throw result

        return result[0] || null
    } catch (err) {
        throw err
    }
}

export const addressCtrl = {
    getAll: getAllAddresses,
    create: createAddress,
    update: updateAddress,
    delete: deleteAddress,
    getById: getAddressById,
}