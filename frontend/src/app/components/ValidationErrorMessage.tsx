import styles from "./validationerrormessage.module.css";

const ValidationErrorMessage = ({ message }: { message: string }) => {
    return (
        <div className={styles.errorContainer}>
                <p className={styles.error} role="alert" aria-live="polite">
                    {message}
                </p>
        </div>
    )
}

export default ValidationErrorMessage;