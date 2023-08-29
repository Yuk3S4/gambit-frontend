import { Auth } from '@aws-amplify/auth'

const register = async( email, password ) => {
    try {
        
        const response = await Auth.signUp({
            username: email,
            password,
        })

        return response
    } catch (err) { 
        throw err        
    }
}

const resendCode = async( email ) => {
    try {
        await Auth.resendSignUp( email )
    } catch (err) {
        throw err
    }
}

const confirmation = async ( email, code ) => {
    try {
        await Auth.confirmSignUp( email, code )
        return true
    } catch (err) {
        throw err
    }
}

const login = async( email, password ) => {
    try {
        await Auth.signIn({
         username: email,
         password,
        })

        const session = await Auth.currentAuthenticatedUser({
            bypassCache: false
        })

        return session
    } catch (err) {
        throw err
    }
}

const retriveSession = async() => {
    try {
        const session = await Auth.currentSession({
            bypassCache: false,
        })

        return session.accessToken.jwtToken
    } catch (err) {
        throw err
    }
}

const logout = async() => {
    try {
        await Auth.signOut()
    } catch (err) {
        throw err
    }
}

export const authCtrl = {
    confirmation,
    register,
    resendCode,
    login,
    retriveSession,
    logout,
}
