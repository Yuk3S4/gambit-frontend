import { useState } from "react"
import { Button, Confirm } from "semantic-ui-react"

export const ConfirmModal = ({ onConfirm, ...rest }) => {

    const [loading, setLoading] = useState(false)

    const onConfirmWrapper = () => {
        setLoading( true )
        onConfirm()
    }

    return (
        <Confirm
            className="confirm"
            size="mini"
            onConfirm={ onConfirmWrapper }
            confirmButton={ 
                <Button primary loading={ loading }>
                    Ok
                </Button>
            }
            { ...rest }
        />
    )
}
