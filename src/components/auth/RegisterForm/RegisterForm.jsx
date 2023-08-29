import Link from "next/link"
import { useRouter } from 'next/router'
import { useFormik } from "formik"
import { Button, Form } from "semantic-ui-react"

import styles from "./RegisterForm.module.scss"
import { initialValues, validationSchema } from "./RegisterForm.form"
import { authCtrl } from "@/api"

export const RegisterForm = () => {
    const router = useRouter()

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async( { email, password } ) => {
            try {                
                const resp = await authCtrl.register( email, password )
                router.push(`/join/confirmation?email=${ email }`)
            } catch (err) {
                console.error( err )
            }
        }
    })

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
                type="password"
                name="password"
                placeholder="Contraseña"
                value={ formik.values.password } 
                onChange={ formik.handleChange }
                error={ formik.errors.password }
            />
            <Form.Input
                type="password"
                name="repeatPassword"
                placeholder="Repetir contraseña"
                value={ formik.values.repeatPassword } 
                onChange={ formik.handleChange }
                error={ formik.errors.repeatPassword } 
            />
            <Form.Button 
                type="submit"
                fluid
                loading={ formik.isSubmitting }
            >
                Crear cuenta
            </Form.Button>
        </Form>

        <p className={ styles.login }>Ya tengo una cuenta</p>
        <Button 
            as={ Link }
            href="/join/login"
            fluid 
            basic
        >
            Iniciar sesión        
        </Button>
    </>
  )
}
