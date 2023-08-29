import { useCallback, useState } from "react"

import { Button, Image } from "semantic-ui-react"
import { useDropzone } from "react-dropzone"

import styles from "./ProductImageForm.module.scss"
import { useFormik } from "formik"
import { initialValues, validationSchema } from "./ProductImageForm.form"
import { productCtrl } from "@/api"

export const ProductImageForm = ({ onClose, onReload, productId }) => {

  const [loading, setLoading] = useState(false)  

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async( formValue ) => {
      try {
        setLoading( true )
        
        const render = new FileReader()
        render.readAsArrayBuffer( formValue.file )
        render.onload = async () => {
          const image = render.result
          await productCtrl.updateImage( productId, image )
          onReload()
          onClose()
        }
      } catch (err) {
        console.log(err)
      }
    }
  })

  const onDrop = useCallback(( acceptedFile ) => {
    const file = acceptedFile[0]
    formik.setFieldValue("file", file)
    formik.setFieldValue("preview", URL.createObjectURL(file)) // crear URL temporal al archivo
  })

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg",
    onDrop,
  })

  const getMiniature = () => {

    if ( formik.values.file ) {
      return formik.values.preview
    }
    return null
  }

  return (
    <div>
        <div className={ styles.imageContainer } { ...getRootProps() }>
          <input { ...getInputProps() } />

          { getMiniature() ? (
            <Image size="small" src={ getMiniature() } />
          ) : (
            <div>
              <span>Arrastra la nueva imágen aquí</span>
            </div>
          )}
        </div>

        <Button 
          primary
          fluid
          loading={ loading }
          onClick={ formik.handleSubmit }
        >
          Enviar
        </Button>
    </div>
  )
}
