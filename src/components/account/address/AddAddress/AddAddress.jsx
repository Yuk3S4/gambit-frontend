import { Modal } from "@/components/shared"
import { useState } from "react"
import { Button } from "semantic-ui-react"
import { AddressForm } from "../AddressForm"

export const AddAddress = ({ onReload }) => {

    const [showModal, setShowModal] = useState(false)
    
    const onCloseOpenModal = () => setShowModal( prevState => !prevState )    

    return (
        <>
            <Button
                primary
                onClick={ onCloseOpenModal }
            >
                Nueva dirección
            </Button>

            <Modal.Basic
                show={ showModal }
                onClose={ onCloseOpenModal }
                title="Nueva dirección"
            >
                <AddressForm onReload={ onReload } onClose={ onCloseOpenModal } />
            </Modal.Basic>
        </>
    )
}
