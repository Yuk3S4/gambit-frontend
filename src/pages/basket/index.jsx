import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import { productCtrl } from "@/api"
import { useBasket } from "@/hooks"
import { BasketLayout } from "@/layouts"
import { Loading, NoResult } from "@/components/shared"
import { size } from "lodash"
import { Basket } from "@/components/basket"

const BasketPage = () => {

  const { basket } = useBasket()
  const [products, setProducts] = useState(null)
  const [address, setAddress] = useState(null)
  const { query: { step = 1 } } = useRouter()

  const currentStep = +step

  useEffect(() => {
    ( async() => {
      try {
        const data = []
        
        for await (const item of basket) {
          const response = await productCtrl.getById( item.id )
          data.push({ ...response, quantity: item.quantity })     
        }
        setProducts( data )
      } catch (err) {
        console.log(err)
      }
    })()
  }, [ basket ])
  

  return (
    <BasketLayout>
        { !products && currentStep !== 4 && <Loading /> }

        { products && size(products) === 0 && currentStep < 4 && (
          <NoResult text="Carrito vacío" />  
        )}

        { size(products) > 0 && currentStep === 1 &&(
          <Basket.StepOne products={ products } /> 
        )}

        { size(products) > 0 && currentStep === 2 &&(
          <div>
            <Basket.StepTwo 
              products={ products } 
              address={ address } 
              setAddress={ setAddress } 
              nextDisabled={ !address }
            />
          </div>  
        )}

        { size(products) > 0 && currentStep === 3 &&(
          <div>
            <Basket.StepThree products={ products } address={ address } />
          </div>  
        )}

        { currentStep === 4 && (
          <div>
            <Basket.StepFour />
          </div>  
        )}
    </BasketLayout>
  )
}

export default BasketPage