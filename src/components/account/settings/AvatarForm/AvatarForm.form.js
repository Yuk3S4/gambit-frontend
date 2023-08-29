import * as Yup from 'yup'

export const initialValues = () => {
    return {
        file: null,
        preview: null
    }
}

export const validationSchema = () => {
    return Yup.object({
        file: Yup.string().required(true),
    })
}