import { useState } from "react"
import { Button, Icon } from "semantic-ui-react"
import styles from "./Address.module.scss"
import { Modal } from "@/components/shared"
import { addressCtrl } from "@/api"
import { AddressForm } from "../../AddressForm"

export const Address = ({ address, onReload }) => {

    const [showEdit, setShowEdit] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const openCloseEdit = () => setShowEdit( prevState => !prevState )
    const openCloseConfirm = () => setShowConfirm( prevState => !prevState )

    const onDelete = async() => {
        try {
            await addressCtrl.delete( address.addId )
            onReload()
            openCloseConfirm()
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className={ styles.address }>
                <div>
                    <p className={ styles.title }>{ address.addTitle }</p>
                    <p className={ styles.addressInfo }>
                        { address.addName }, { address.addAddress }, { address.addState } { " " }, { address.addCity }, { address.addPostalCode }
                    </p>
                </div>
                
                <div className={ styles.actions }>
                    <Button
                        primary
                        icon
                        onClick={ openCloseEdit } 
                    >
                        <Icon name="pencil"/>
                    </Button>
                    <Button
                        primary
                        icon
                        onClick={ openCloseConfirm } 
                    >
                        <Icon name="delete" />
                    </Button>
                </div>
            </div>

            <Modal.Confirm 
                open={ showConfirm }
                onCancel={ openCloseConfirm }
                onConfirm={ onDelete }
                content={ `¿Estas seguro de que quieres eliminar la dirección?` }
            />

            <Modal.Basic
                show={ showEdit }
                onClose={ openCloseEdit }
                title="Editar dirección"
            >
                <AddressForm 
                    onClose={ openCloseEdit }
                    onReload={ onReload }
                    address={ address }
                />
            </Modal.Basic>
        </>
    )
}
