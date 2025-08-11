
import styles from "./resultsnoaction.module.css";
import LogoutButton from "./LogOutButton";

const ResultsNoAction = () => { 
    return (
        <div className={styles.resultsContainer}>
            <h1 className={styles.resultsTitle}>Your Results</h1>
            <p className={styles.resultsText}>Thank you for answering our questions, we don't need to see you at this time.</p>
            <p className={styles.resultsText}>Keep up the good work!</p>

            <LogoutButton />
        </div>
    )
}

export default ResultsNoAction;

