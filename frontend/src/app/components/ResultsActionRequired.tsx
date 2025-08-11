
import styles from "./resultsactionrequired.module.css";
import LogoutButton from "./LogOutButton";

const ResultsActionRequired = () => { 
    return (
        <div className={styles.resultsContainer}>
          <h1 className={styles.resultsTitle}>Your Results</h1>
          <p className={styles.resultsText}>We think there are some simple things you could do to improve you quality of life.</p>
          <p className={styles.resultsText}>Please phone to book an appointment.</p>
          <LogoutButton />
        </div>
    )
}

export default ResultsActionRequired;

