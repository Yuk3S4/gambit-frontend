import { Loader } from "semantic-ui-react"
import styles from "./Loading.module.scss"
import { Separator } from "../Separator"

export const Loading = ({ text = "Cargando", top = 0 }) => {

    return (
        <>
            <Separator height={ top } />
            <Loader active inline="centered" className={ styles.loading } >
                { text }
            </Loader>
        </>
    )
}
