import { ENV, authFetcher } from '@/utils'

const getAllProducts = async( page = 1, pageSize = 10, search = "" ) => {
    try {
        
        const paginationFilter = `page=${ page }&pageSize=${ pageSize }`
        const searchFilter = `search=${ search }`
        const filters = `${ paginationFilter }&${ searchFilter }`

        const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.PRODUCT }?${ filters }`

        const resp = await fetch(url)
        const result = await resp.json()

        if ( resp.status !== 200 ) throw result

        return result
    } catch (err) {
        throw err
    }
}

const createProduct = async( data ) => {
    try {
        const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.PRODUCT }`
        const params = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( data ),
        }

        const response = await authFetcher( url, params )

        if ( response.status !== 200 ) throw response

        return true
    } catch (err) {
        console.log(err)
    }
}

const updateProduct = async( data, productId ) => {
    try {
        const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.PRODUCT }/${ productId }`
        const params = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( data ),
        }

        // Para peticiones que necesitan ser autenticadas
        const response = await authFetcher( url, params )

        if ( response.status !== 200 ) throw response

        return true
    } catch (err) {
        console.log(err)
    }
} 

export const updateImage = async( productId, image ) => {
    try {
        const url = `${ ENV.MEDIA_API }/${ productId }.jpg`
        const params = {
            method: "PUT",
            headers: {
                "Content-Type": "image/jpeg",
            },
            body: image,
        }

        const response = await authFetcher( url, params )

        if ( response.status !== 200 ) throw response

        return true
    } catch (err) {
        throw err
    }
}

export const deleteProduct = async( productId ) => {
    try {
        const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.PRODUCT }/${ productId }`
        const params = { method: "DELETE" }

        const response = await authFetcher( url, params )

        if ( response.status !== 200 ) throw response

        return true
    } catch (err) {
        throw err
    }
}

const getProductsByCategorieSlug = async( slug, page = 1, pageSize = 10 ) => {

    try {
        const categoryFilter = `slugCateg=${ slug }`
        const paginationFilter = `page=${ page }&pageSize=${ pageSize }`
        const filters = `${ categoryFilter }&${ paginationFilter }`

        const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.PRODUCT }?${ filters }`

        const resp = await fetch(url)
        const result = await resp.json()

        if ( resp.status !== 200 ) throw result

        return result
    } catch (err) {
        throw err
    }

}

const getProductBySlug = async( slug ) => {
    try {

        const filters = `slug=${ slug }`
        const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.PRODUCT }?${ filters }`

        const resp = await fetch(url)
        const result = await resp.json()

        if ( resp.status !== 200 ) throw result
        
        return result.data[0] || null
    } catch (err) {
        throw err
    }
}

const getProductById = async( productId ) => {
    try {
        const filters = `prodId=${ productId }`
        const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.PRODUCT }?${ filters }`

        const resp = await fetch(url)
        const result = await resp.json()

        if ( resp.status !== 200 ) throw result
        
        return result.data[0] || null
    } catch (err) {
        throw err
    }
}

export const productCtrl = {
    getAll: getAllProducts,
    create: createProduct,
    update: updateProduct,
    delete: deleteProduct,
    getByCategorieSlug: getProductsByCategorieSlug,
    getBySlug: getProductBySlug,
    getById: getProductById,
    updateImage,
}