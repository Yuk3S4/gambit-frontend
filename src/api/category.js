import { ENV, authFetcher } from '@/utils'

const getAllCategories = async() => {
    try {
        const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.CATEGORY }`

        const response = await fetch(url)
        const result = await response.json()

        if ( response.status !== 200 ) throw result

        return result
    } catch (err) {
        throw err
    }
}

const createCategory = async( data ) => {
    try {
        const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.CATEGORY }`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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

const updateCategory = async( data, categoryId ) => {
    try {
        
        const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.CATEGORY }/${ categoryId }`
        const params = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
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

const deleteCategory = async( categoryId ) => {
    try {
        const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.CATEGORY }/${ categoryId }`
        const params = {
            method: "DELETE",
        }

        const response = await authFetcher( url, params )

        if ( response.status !== 200 ) throw response

        return true
    } catch (err) {
        throw err
    }
}

export const categoryCtrl = {
    getAll: getAllCategories,
    create: createCategory,
    update: updateCategory,
    delete: deleteCategory,
}