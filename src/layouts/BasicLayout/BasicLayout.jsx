import { Container } from "semantic-ui-react"

import styles from "./BasicLayout.module.scss"
import { Account, AdminButton, Basket, CategoriesMenu, Logo } from "@/components/layout"
import { useAuth } from "@/hooks"
import { Search } from "@/components/shared"

export const BasicLayout = ({ children }) => {

    const { isAdmin } = useAuth()
        
    return (
        <>
            <div className={ styles.border }>
                <Container className={ styles.header }>
                    <div className={ styles.left }>
                        <Logo />
                        <Search placeholder="Busca lo que necesitas..." className={ styles.search } />
                    </div>

                    <div>
                        { isAdmin && <AdminButton /> }                        
                        <Account />
                        <Basket />
                    </div>
                </Container>
            </div>
            
            <div className={ styles.border }>
                <Container>
                    <CategoriesMenu />
                </Container>
            </div>

            { children }
        </>
    )
}
