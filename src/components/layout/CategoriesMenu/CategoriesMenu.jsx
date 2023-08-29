import { useEffect, useState } from "react"
import Link from "next/link"

import { map } from 'lodash'

import styles from "./CategoriesMenu.module.scss"
import { categoryCtrl } from "@/api"

export const CategoriesMenu = () => {
    
    const [categories, setCategories] = useState(null)

    useEffect(() => {
        ( async() => {
          try {
            const resp = await categoryCtrl.getAll()
            setCategories( resp )
          } catch (err) {
            console.log(err)            
          }
        })()      
    }, [])    

    return (
      <div className={ styles.container }>
        { map( categories, (category) => (
          <Link key={ category.categID } href={ `/categories/${ category.catePath }` }>
            { category.cateName }
          </Link>  
        )) }
      </div>
    )
}