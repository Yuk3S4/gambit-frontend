import styles from "./NoResult.module.scss"

export const NoResult = ({ text = 'No hay resultados' }) => {

    return (
        <div className={ styles.noResult }>
            <p>{ text }</p>
        </div>
    )
}
