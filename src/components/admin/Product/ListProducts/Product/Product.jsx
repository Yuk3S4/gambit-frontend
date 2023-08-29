import { useEffect, useState } from "react"
import { Icon, Image, Table } from "semantic-ui-react"
import styles from "./Product.module.scss"
import { fn } from "@/utils"
import { Modal } from "@/components/shared"
import { ProductForm } from "@/components/admin/ProductForm"
import { ProductImageForm } from "../../ProductImageForm"
import { productCtrl } from "@/api"

const NOT_FOUND_IMAGE = "/assets/not-found.jpg"

export const Product = ({ product, onReload }) => {

    const [image, setImage] = useState(NOT_FOUND_IMAGE)
    const [openModal, setOpenModal] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const [showConfirm, setShowConfirm] = useState(false)

    useEffect(() => {
        const imageUrl = fn.getUrlImage( product.prodID )

        fn.checkImageExists( imageUrl, (exists) => {
            if ( exists ) setImage( imageUrl )
        })              
    }, [product])

    const onOpenCloseConfirm = () => setShowConfirm( prevState => !prevState )

    const onDelete = async() => {
        try {
            await productCtrl.delete( product.prodID )
            onReload()
            onOpenCloseConfirm()
            
        } catch (err) {
            console.log(err)
        }
    }

    const closeModal = () => {
        setOpenModal(false)
        setModalContent(null)
    }    

    const openEditProduct = () => {
        setModalContent( <ProductForm onClose={ closeModal } onReload={ onReload } product={ product } /> )
        setOpenModal( true )
    }

    const openEditImageProduct = () => {
        setModalContent( 
            <ProductImageForm 
                onClose={ closeModal } 
                onReload={ onReload } 
                productId={ product.prodID } 
            /> 
        )
        setOpenModal( true ) 
    }

    return (
        <>
            <Table.Cell>{ product.prodID }</Table.Cell>
            <Table.Cell>
                <Image className={ styles.image } src={ image } alt={ product.prodTitle } />
            </Table.Cell>
            <Table.Cell>{ product.prodTitle }</Table.Cell>
            <Table.Cell>${ product.prodPrice }</Table.Cell>
            <Table.Cell>{ product.prodStock } Unidades</Table.Cell>
            <Table.Cell className={ styles.actions }>
                <Icon
                    name="pencil"
                    link
                    onClick={ openEditProduct }
                />
                <Icon
                    name="image"
                    link
                    onClick={ openEditImageProduct }
                />
               <Icon onClick={ onOpenCloseConfirm } name="trash" link />
            </Table.Cell>    

            <Modal.Confirm 
                open={ showConfirm }
                onCancel={ onOpenCloseConfirm }
                onConfirm={ onDelete }
                content={ `¿Estas seguro de eliminar el producto (${ product.prodTitle })?` }
            />

            <Modal.Basic 
                show={ openModal }
                onClose={ closeModal }
                title={`Editar (${ product.prodTitle })`}
            >
                { modalContent }    
            </Modal.Basic>        
        </>
    )
}
