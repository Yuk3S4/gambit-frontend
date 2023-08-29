import * as Yup from 'yup'

export const initialValues = () => {
    return {
        email: "",
        code: "",
    }
}

export const validationSchema = () => {
    return Yup.object({
        email: Yup.string().email("Email inválido").required(true),
        code: Yup.string().required(true),
    })
}