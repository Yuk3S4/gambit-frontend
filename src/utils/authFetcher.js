import { authCtrl } from "@/api"

export const authFetcher = async( url, params ) => {

    const token = await authCtrl.retriveSession()

    const logout = () => {
        authCtrl.logout()
        window.location.replace("/")
    }

    if ( !token ) {
        logout()
    } else {
        const paramsTemp = {
            ...params,
            headers: {
                ...params?.headers,
                Authorization: token,
            }
        }

        try {
            return await fetch(url, paramsTemp)
        } catch (err) {
            throw err
        }
    }

}