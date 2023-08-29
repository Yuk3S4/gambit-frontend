import * as Yup from 'yup'

export const initialValues = (data) => {
    return {
        CateName: data?.cateName || "",
        CatePath: data?.catePath || "",
    }
}

export const validationSchema = () => {
    return Yup.object({
        CateName: Yup.string().required(true),
        CatePath: Yup.string().required(true),
    })
}