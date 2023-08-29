import * as Yup from 'yup'

export const initialValues = () => {
    return {
        email: "",
        password: "",
    }
}

export const validationSchema = () => {
    return Yup.object({
        email: Yup.string().email("Email inválido").required(true),
        password: Yup.string().required(true),
    })
}