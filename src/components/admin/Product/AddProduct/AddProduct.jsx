import { Modal } from "@/components/shared"
import { useState } from "react"
import { Button } from "semantic-ui-react"
import { ProductForm } from "../../ProductForm"


export const AddProduct = ({ onReload }) => {

    const [openModal, setOpenModal] = useState(false)

    const openCloseModal = () => setOpenModal( prevState => !prevState )

    return (
        <>
            <Button primary onClick={ openCloseModal }>Nuevo Producto</Button>

            <Modal.Basic 
                show={ openModal } 
                onClose={ openCloseModal } 
                title="Nuevo producto"
            >
                <ProductForm onClose={ openCloseModal } onReload={ onReload } />
            </Modal.Basic>
        </>
    )
}
