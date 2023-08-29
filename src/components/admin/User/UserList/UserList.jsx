import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import { Table } from "semantic-ui-react"
import { map } from "lodash"

import { userCtrl } from "@/api"
import { Loading, Pagination } from "@/components/shared"
import { User } from "./User"

const ITEM_PER_PAGE = 10   

export const UserList = () => {

    const { query } = useRouter()
    const [users, setUsers] = useState(null)
    const [totalPages, setTotalPages] = useState(null)

    const page = +query.page || 1

    useEffect(() => {
        (async() => {
            try {
                setUsers(null)
                const response = await userCtrl.getAll( page )
                setUsers(response.data)
                setTotalPages( Math.ceil( response.totalItems / ITEM_PER_PAGE) )
                
                // TODO: Total users response.totalItems
            } catch (err) {
                console.log(err)
            }
        })()   
    }, [ query.page ])
    
    if ( !users ) return <Loading text="Cargando usuarios" />

  return (
    <>
        <Table striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Avatar</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.HeaderCell>Admin</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                { map( users, (user) => (
                
                    <Table.Row key={ user.userUUID }>
                        <User user={ user } />
                    </Table.Row>
                    
                )) }
            </Table.Body>
        </Table>

        <Pagination currentPage={ page } totalPages={ totalPages } />
    </>    
  )
}
