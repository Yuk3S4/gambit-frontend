import { useState } from "react"
import { Container, Tab } from "semantic-ui-react"

import { BasicLayout } from "@/layouts"
import styles from "./account.module.scss"
import { useAuth } from "@/hooks"
import { Address, Orders, Settings } from "@/components/account"
import { Separator } from "@/components/shared"

const AccountPage = () => {

    const { logout } = useAuth()
    const [reload, setReload] = useState(false)

    const onReload = () => setReload( prevState => !prevState )

    const panes = [    
        {
            menuItem: "Mis datos",
            render: () => (
                <Tab.Pane>
                    <Settings.AvatarForm />
                    <Separator height={50} />
                    <Settings.ChangeNameForm />
                </Tab.Pane>    
            )
        },
        {
            menuItem: "Mis direcciones",
            render: () => (
                <Tab.Pane>
                    <Address.AddAddress onReload={ onReload } />
                    <Address.ListAdresses reload={ reload } onReload={ onReload } />
                </Tab.Pane>    
            )
        },
        {
            menuItem: "Mis pedidos",
            render: () => (
                <Tab.Pane>
                    <Orders.List />
                </Tab.Pane>    
            )
        },
        {
            menuItem: {
                key: 20,
                icon: "log out",
                content: "Cerrar sesión",
                onClick: logout
            }
        }
    ]

  return (
    <BasicLayout>
        <Container>
            <Tab 
                panes={ panes } 
                className={ styles.tabs } 
                menu={{ fluid: true, vertical: true, tabular: true }}
            />
        </Container>        
    </BasicLayout>
  )
}

export default AccountPage  