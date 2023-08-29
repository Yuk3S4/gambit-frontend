import { Modal } from "@/components/shared"
import { useState } from "react"
import { Button } from "semantic-ui-react"
import { CategoryForm } from "../CategoryForm"

export const AddCategory = ({ onReload }) => {

    const [openModal, setOpenModal] = useState(false)

    const openCloseModal = () => setOpenModal( prevState => !prevState )

    return (
        <>
            <Button primary onClick={ openCloseModal }>
                Nueva categoria
            </Button>

            <Modal.Basic show={ openModal } onClose={ openCloseModal } title="Nueva categoría" >
                <CategoryForm onClose={ openCloseModal } onReload={ onReload } />
            </Modal.Basic>
        </>
    )
}
