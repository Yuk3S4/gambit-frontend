import { useEffect, useState } from "react"

import { Form } from "semantic-ui-react"
import { Editor } from '@tinymce/tinymce-react'
import { useFormik } from "formik"


import { categoryCtrl, productCtrl } from "@/api"
import { Separator } from "@/components/shared"
import { map } from "lodash"
import { initialValues, validationSchema } from "./ProductForm.form"

export const ProductForm = ({ onClose, onReload, product }) => {

    const [categories, setCategories] = useState([])  
    
    const formik = useFormik({
        initialValues: initialValues( product ),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async( formValue ) => {
            try {

                if ( product ) { // TODO: Edit
                    await productCtrl.update( formValue, product.prodID )
                } else {
                    await productCtrl.create( formValue )                
                }                
                onReload()
                onClose()
            } catch (err) {
                console.error(err)
            }
        }
    })

    useEffect(() => {
        ( async() => {
            try {
                
                const response = await categoryCtrl.getAll()
                const result = map( response, (category) => ({
                    key: category.categID,
                    value: category.categID,
                    text: category.cateName,
                }))

                setCategories(result)
            } catch (err) {
                console.error(err)
            }
        
        })()
    }, [])
    

    return (
        <Form onSubmit={ formik.handleSubmit }>
            <Form.Input
                name="ProdTitle"
                placeholder="Nombre"
                value={ formik.values.ProdTitle }
                onChange={ formik.handleChange }
                error={ formik.errors.ProdTitle }
            />
            <Form.Input
                name="ProdPath"
                placeholder="Slug"
                value={ formik.values.ProdPath }
                onChange={ formik.handleChange }
                error={ formik.errors.ProdPath }
            />

            <Editor
                init={{
                    height: 400,
                    menubar: true,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                }}       
                initialValue={ formik.values.ProdDescription }         
                onBlur={(evt) => formik.setFieldValue("ProdDescription", evt.target.getContent()) }
            />

            <Separator height={ 20 } />

            <Form.Dropdown 
                name="ProdCategId" 
                placeholder="Categoría del producto" 
                search 
                selection 
                fluid       
                options={ categories }   
                value={ formik.values.ProdCategId }       
                error={ formik.errors.ProdCategId }
                onChange={ (_, data) => formik.setFieldValue("ProdCategId", data.value) }
            />

            <Form.Group widths="equal">
                <Form.Input 
                    type="number"
                    name="ProdPrice"
                    placeholder="Precio"
                    value={ formik.values.ProdPrice }
                    onChange={ formik.handleChange }
                    error={ formik.errors.ProdPrice }
                />
                <Form.Input 
                    type="number"
                    name="ProdStock"
                    placeholder="Stock"
                    value={ formik.values.ProdStock }
                    onChange={ formik.handleChange }
                    error={ formik.errors.ProdStock }
                />
            </Form.Group>

            <Form.Button
                type="submit"
                fluid
                loading={ formik.isSubmitting }
            >
                Enviar
            </Form.Button>
        </Form>
    )
}
