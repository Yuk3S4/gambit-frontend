import * as Yup from 'yup'

export const initialValues = ( userFirstName, userLastName ) => {
    return {
        userFirstName: userFirstName || "",
        userLastName:  userLastName || ""
    }
}

export const validationSchema = () => {
    return Yup.object({
        userFirstName: Yup.string().required(true),
        userLastName: Yup.string().required(true),
    })
}