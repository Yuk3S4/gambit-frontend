import { ENV, authFetcher } from '@/utils'
import { Auth } from '@aws-amplify/auth'

const me = async() => {
    try {       

        const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.USER_ME }`       
        const response = await authFetcher( url )
        const result = await response.json()

        if ( response.status !== 200 ) throw result

        return result
    } catch (err) {
        throw err
    }
}

const getAll = async( page = 1 ) => {
    try {

        const filters = `page=${ page }`
        const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.USERS }?${ filters }`

        const response = await authFetcher( url )
        const result = await response.json()

        if ( response.status !== 200 ) throw result

        return result
        
    } catch (err) {
        throw err
    }
}

export const updateAvatar = async( userId, image ) => {
    try {
        const url = `${ ENV.MEDIA_API }/${ userId }.jpg`
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

export const updateMe = async( data ) => {
    try {
        const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.USER_ME }`
        const params = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( data ),
        }

        const response = await authFetcher( url, params )

        if ( response.status !== 200 ) throw response

        return true
    } catch (err) {
        throw err
    }
}

export const userCtrl = {
    me,
    getAll,
    updateAvatar,
    updateMe,
}