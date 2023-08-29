import { useEffect, useState } from "react"
import { Container } from "semantic-ui-react"
import { GridCategorias, GridProducts, Separator } from "@/components/shared"
import { useAuth } from "@/hooks"
import { BasicLayout } from "@/layouts"
import styles from "./home.module.scss"
import { productCtrl } from "@/api"

const HomePage = () => {

  const [products, setProducts] = useState(null)

  useEffect(() => {
    (async() => {
      try {
        const response = await productCtrl.getAll(1, 100)
        setProducts(response.data || [])
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])
  

  return (
    <BasicLayout>
      <Separator height={ 50 } />
      
      <Container>
        <GridCategorias />
        
        <Separator height={50} />

        <h2>Últimos productos</h2>
        <Separator height={10} />
        <GridProducts 
          products={ products } 
          columns={ 4 } 
          classProduct={ styles.product }           
        />
      </Container>
    </BasicLayout>
  )
}

export default HomePage