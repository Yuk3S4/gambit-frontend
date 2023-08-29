import Link from 'next/link'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { Button, Form } from 'semantic-ui-react'
import Swal from 'sweetalert2'

import styles from './LoginForm.module.scss'
import { initialValues, validationSchema } from './LoginForm.form'
import { authCtrl } from '@/api'
import { useAuth } from '@/hooks'

export const LoginForm = () => {

    const { login } = useAuth()
    const router = useRouter()

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async({ email, password }) => {
            try {
                await authCtrl.login( email, password )
                await login()
                router.push("/")
            } catch (err) {
                console.error(err)
                Swal.fire(
                    'Error en credenciales',
                    'Credenciales incorrectas',
                    'error'
                )
            }
        }
    })

    return (
        <>
            <Form onSubmit={ formik.handleSubmit }>
                <Form.Input
                    name="email"
                    placeholder="Correo electrónico" 
                    values={ formik.values.email }
                    onChange={ formik.handleChange }
                    error={ formik.errors.email }
                />
                <Form.Input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    values={ formik.values.password }
                    onChange={ formik.handleChange }
                    error={ formik.errors.password }
                />
                <Form.Button
                    type="submit"
                    fluid
                    loading={ formik.isSubmitting }
                >
                    Iniciar sesión
                </Form.Button>
            </Form>

            <p className={ styles.register }>¿Eres nuevo cliente?</p>
            <Button
                as={ Link }
                href="/join/register"
                fluid 
                basic
            >
                Crear cuenta
            </Button>
        </>
    )
}
