import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { userCtrl, authCtrl } from "@/api";

export const AuthContext = createContext()

export const AuthProvider = (props) => {
    const { children } = props
    const router = useRouter()

    const [user, setUser] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async() => {
            try {
                await login()
                setLoading(false)
            } catch (err) {
                setLoading(false)                
            }
        })()
    }, [])
    

    const login = async() => {
        try {            
            const resp = await userCtrl.me()
            setUser(resp)
            setIsAdmin( resp.userStatus === 0 )
            setLoading(false)

        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    const logout = () => {
        setUser(null)
        authCtrl.logout()
        router.push("/")
    }

    const updateUer = ( key, value ) => {
        setUser({
            ...user,
            [key]: value,
        })
    }
    
    const data = {
        // Properties
        user,
        isAdmin,

        // Methods
        login,
        logout,
        updateUer,
    }

    if ( loading ) return null
    
    return <AuthContext.Provider value={ data }>
        { children }
    </AuthContext.Provider>
}
