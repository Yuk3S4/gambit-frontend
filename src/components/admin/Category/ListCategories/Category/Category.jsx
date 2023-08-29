import { useState } from 'react'

import styles from './Category.module.scss'
import { Icon, Table } from 'semantic-ui-react'
import { Modal } from '@/components/shared'
import { CategoryForm } from '../../CategoryForm'
import { categoryCtrl } from '@/api'

export const Category = ({ category, onReload }) => {

    const [openModal, setOpenModal] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const onOpenCloseModal = () => setOpenModal( prevState => ! prevState )
    const onOpenCloseConfirm = () => setShowConfirm( prevState => !prevState )

    const onDelete = async() => {
        try {
            await categoryCtrl.delete( category.categID )
            onReload()            
            onOpenCloseConfirm()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Table.Cell>{ category.categID }</Table.Cell>
            <Table.Cell>{ category.cateName }</Table.Cell>
            <Table.Cell>{ category.catePath }</Table.Cell>
            <Table.Cell className={ styles.actions } textAlign="right">
                <Icon onClick={ onOpenCloseModal } name="pencil" link />
                <Icon onClick={ onOpenCloseConfirm } name="trash" link />
            </Table.Cell>

            <Modal.Confirm 
                open={ showConfirm }
                onCancel={ onOpenCloseConfirm }
                onConfirm={ onDelete }
                content={ `¿Estas seguro de eliminar la categoria (${ category.cateName })?` }
            />

            <Modal.Basic show={ openModal } onClose={ onOpenCloseModal } title={ `Editar ${ category.cateName }` }>
                <CategoryForm 
                    onClose={ onOpenCloseModal }
                    onReload={ onReload }
                    category={ category } 
                />
            </Modal.Basic>

        </>
    )
}
