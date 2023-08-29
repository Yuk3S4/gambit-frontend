import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Separator } from "@/components/shared"
import { Button, Form } from "semantic-ui-react"
import { useFormik } from "formik"
import { initialValues, validationSchema } from "./Confirmation.form"
import { authCtrl } from "@/api"

export const ConfirmationForm = () => {
    const router = useRouter()
    const { query } = router
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        formik.setFieldValue( "email", query.email )
    
    }, [ query ])
    

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async( formValue ) => {
            try {
                await authCtrl.confirmation( formValue.email, formValue.code )
                router.push("/join/login")
            } catch (err) {
                console.error(err)                
            }
        }
    })

    const onResendCode = async() => {
        formik.setFieldError("email", false)
        if ( !formik.values.email ) {
            formik.setFieldError( "email", "Email requerido" )
            return
        }

        setLoading( true )
        await authCtrl.resendCode( formik.values.email )
        setLoading( false )
    }

    return (
        <>
            <Form onSubmit={ formik.handleSubmit }>
                <Form.Input 
                    name="email" 
                    placeholder="Correo electrónico" 
                    value={ formik.values.email }
                    onChange={ formik.handleChange }
                    error={ formik.errors.email }
                />            
                <Form.Input 
                    name="code" 
                    placeholder="Código de confirmación" 
                    value={ formik.values.code }
                    onChange={ formik.handleChange }
                    error={ formik.errors.code }
                /> 
                <Form.Button 
                    type="submit"
                    fluid
                    loading={ formik.isSubmitting }
                >
                    Activar usuario
                </Form.Button>   
            </Form>
            
            <Separator height={25} />

            <Button
                fluid
                basic
                onClick={ onResendCode }
                loading={ loading }
            >
                Reenviar código de verificación    
            </Button>  
        
        </>
    )
}

