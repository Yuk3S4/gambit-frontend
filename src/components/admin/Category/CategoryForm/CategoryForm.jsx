import { useFormik } from "formik"
import { Form } from "semantic-ui-react"
import { initialValues, validationSchema } from "./CategoryForm.form"
import { categoryCtrl } from "@/api"

export const CategoryForm = ({ onClose, onReload, category }) => {

    const formik = useFormik({
        initialValues: initialValues( category ),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async(formValue) => {
            try {

                if ( category ) {
                    await categoryCtrl.update( formValue, category.categID )
                } else {
                    await categoryCtrl.create( formValue )                    
                }
                onReload()
                onClose()
            } catch (err) {
                console.log(err)
            }
        }
    })

  return (
    <Form onSubmit={ formik.handleSubmit }>
        <Form.Input
            name="CateName"
            placeholder="Nombre de la categoría" 
            value={ formik.values.CateName }
            onChange={ formik.handleChange }
            error={ formik.errors.CateName }
        />
        <Form.Input
            name="CatePath"
            placeholder="Slug de la categoría" 
            value={ formik.values.CatePath }
            onChange={ formik.handleChange }
            error={ formik.errors.CatePath }
        />

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
