import { useState } from "react"
import { useRouter } from "next/router"

import { Container, Tab } from "semantic-ui-react"

import { BasicLayout } from "@/layouts"
import styles from "./admin.module.scss"
import { useAuth } from "@/hooks"
import { Search } from "@/components/shared"
import { Category, Product, User } from '@/components/admin'

const AdminPage = () => {

    const [reload, setReload] = useState(false)
    const { isAdmin } = useAuth()
    const router = useRouter()

    const onReload = () => setReload( prevState => !prevState )

    if ( !isAdmin ) {
        router.push("/")
        return null
    }

    const panes = [
        {
            menuItem: "Productos",
            render: () => (
                <Tab.Pane>
                    <div className={ styles.actions }>
                        <Search queryName="searchAdmin" />
                        <Product.AddProduct onReload={ onReload } />
                    </div>

                    <Product.ListProducts reload={ reload } onReload={ onReload } />
                </Tab.Pane>    
            )
        },
        {
            menuItem: "Categorias",
            render: () => (
                <Tab.Pane>
                    <div className={ styles.actions }>
                        <div />
                        <Category.AddCategory onReload={ onReload } />
                    </div>
                    
                    <Category.ListCategories reload={ reload } onReload={ onReload } />
                </Tab.Pane>    
            )
        },
        {
            menuItem: "Usuarios",
            render: () => (
                <Tab.Pane>                    
                    <User.List />
                </Tab.Pane>    
            )
        }
    ]

    return (
        <BasicLayout>
            <Container>
                <Tab panes={ panes } className={ styles.tabs } />
            </Container>
        </BasicLayout>
    )
}

export default AdminPage