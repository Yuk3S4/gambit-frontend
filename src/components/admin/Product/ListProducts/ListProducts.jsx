import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import { map, size } from "lodash"
import { Table } from "semantic-ui-react"

import { productCtrl } from "@/api"
import { Loading, NoResult, Pagination } from "@/components/shared"
import { Product } from "./Product"

const ITEMS_PER_PAGE = 10

export const ListProducts = ({ reload, onReload }) => {

  const { query } = useRouter()
  const [products, setProducts] = useState(null)
  const [totalPages, setTotalPages] = useState(null)
  const page = +query.page || 1

  useEffect(() => {
      ( async() => {
        try {
          setProducts(null)
          const searchText = query.searchAdmin || ''
          const response = await productCtrl.getAll(page, ITEMS_PER_PAGE, searchText)
          console.log(response);
          
          setProducts( response.data || [] )

          setTotalPages( Math.ceil(response.totalItems / ITEMS_PER_PAGE) )

        } catch (err) {
          console.log(err)
        }
      })()
  }, [ reload, query.page, query.searchAdmin ])
  
  if ( !products ) return <Loading text="Cargando productos" />

  return (
    <div>        
        <Table striped >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Image</Table.HeaderCell>
              <Table.HeaderCell>Nombre</Table.HeaderCell>
              <Table.HeaderCell>Precio</Table.HeaderCell>
              <Table.HeaderCell>Stock</Table.HeaderCell>
              <Table.HeaderCell>Acciones</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            { size(products) === 0 && (
              <Table.Cell colSpan="5">
                <NoResult text="No hay categorias" />
              </Table.Cell> 
            )}

            {
              map(products, ( product ) => (
                <Table.Row key={ product.prodID }>
                  <Product product={ product } onReload={ onReload } />
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>

        <Pagination currentPage={ page } totalPages={ totalPages } />
    </div>
  )
}
