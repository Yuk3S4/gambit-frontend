import { useEffect, useState } from "react"

import { map, size } from "lodash"
import { Table } from "semantic-ui-react"

import { categoryCtrl } from "@/api"
import { Loading, NoResult } from "@/components/shared"
import { Category } from "./Category"

export const ListCategories = ({ reload, onReload }) => {

    const [categories, setCategories] = useState(null)

    useEffect(() => {
        (async() => {
            try {
                const response = await categoryCtrl.getAll()
                setCategories(response)
            } catch (err) {
                console.log(err)
            }            
        })()
    }, [ reload ])
    
    if ( !categories ) return <Loading text="Cargando categorias" />

    return (
        <Table striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>Slug</Table.HeaderCell>
                    <Table.HeaderCell>Acciones</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                { size(categories) === 0 && (
                    <Table.Cell colSpan="4">
                        <NoResult text="No hay categorias" />
                    </Table.Cell>    
                )}

                { map( categories, (category) => (
                    <Table.Row key={ category.categID }>
                        <Category category={ category } onReload={ onReload } />
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}
