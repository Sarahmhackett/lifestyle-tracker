import styles from "./lifestyleform.module.css";

const LifestyleForm = () => {
    return (
        <div className={styles.formContainer}>
        <form className={styles.form}>
            <h1 className={styles.title}>Lifestyle Tracker</h1>

            <p className={styles.description}>
                Please answer the following questions to help us track your lifestyle and provide you with a personalised report.
            </p>

            <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>
                    Do you drink on more than 2 days per week?
                </legend>

                <div className={styles.radioItem}>
                    <input 
                        type="radio" 
                        name="drink" 
                        value="yes" 
                        className={styles.radioInput} 
                        required
                    />
                    <label htmlFor="drink alcohol yes" className={styles.radioLabel}>Yes</label>
                </div>

                <div className={styles.radioItem}>
                    <input 
                        type="radio" 
                        name="drink" 
                        value="no" 
                        className={styles.radioInput} 
                        required
                    />
                    <label htmlFor="drink alcohol no" className={styles.radioLabel}>No</label>
                </div>
            </fieldset>

            <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>
                    Do you smoke?
                </legend>
                <div className={styles.radioItem}>
                    <input 
                        type="radio" 
                        name="smoke" 
                        value="yes" 
                        className={styles.radioInput} 
                        required
                    />
                    <label htmlFor="smoke yes" className={styles.radioLabel}>Yes</label>
                </div>

                <div className={styles.radioItem}>
                    <input 
                        type="radio" 
                        name="smoke" 
                        value="no" 
                        className={styles.radioInput} 
                        required
                    />
                    <label htmlFor="smoke no" className={styles.radioLabel}>No</label>
                </div>
            </fieldset>

            <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>
                    Do you exercise for more than 1 hour per week?
                </legend>

                <div className={styles.radioItem}>
                    <input 
                        type="radio" 
                        name="exercise" 
                        value="yes" 
                        className={styles.radioInput}
                    />
                    <label htmlFor="exercise yes" className={styles.radioLabel}>Yes</label>
                </div>

                <div className={styles.radioItem}>
                    <input 
                        type="radio"
                        name="exercise"
                        value="no"
                        className={styles.radioInput}
                    />
                    <label htmlFor="exercise no" className={styles.radioLabel}>No</label>
                </div>
            </fieldset>

            <button type="submit" className={styles.submitButton}>
                Submit
            </button>

        </form>
    </div>
    )
}

export default LifestyleForm;