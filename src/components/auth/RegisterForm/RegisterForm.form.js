import * as Yup from 'yup'

export const initialValues = () => {
    return {
        email: "",
        password: "",
        repeatPassword: "",
    }
}

export const validationSchema = () => {
    return Yup.object({
        email: Yup.string().email("Email inválido").required(true),
        password: Yup.string().required(true),
        repeatPassword: Yup.string()
                           .required(true)
                           .oneOf([ Yup.ref("password") ], "La contraseña no es igual")
    })
}