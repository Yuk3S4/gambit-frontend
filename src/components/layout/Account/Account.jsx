import Link from "next/link"
import { useAuth } from "@/hooks"
import styles from "./Account.module.scss"
import { Icon } from "semantic-ui-react"

export const Account = () => {

    const { user } = useAuth()
    const url = user ? '/account' : '/join/login'

    return (
        <Link href={ url } className={ styles.account }>
            <Icon name="user" />
            { user?.userEmail ? `${ user.userEmail.slice(0, 14) }...`: "Entrar" }
        </Link>
    )
}