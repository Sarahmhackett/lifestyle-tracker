"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { validatePatient } from "../utils/validatePatientAPI";
import ValidationErrorMessage from "./ValidationErrorMessage";
import styles from "./validateuserform.module.css";

const ValidateUserForm = () => {

    const router = useRouter();

    const [nhsNumber, setNhsNumber] = useState<number | null>(null);
    const [surname, setSurname] = useState<string>("");
    const [dateOfBirth, setDateOfBirth] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Form Validation
        if (nhsNumber === null || nhsNumber.toString().length !== 9) {
            setErrorMessage("Please enter a valid 9 digit NHS number");
            return;
        }
        if (!surname) {
            setErrorMessage("Surname field is required");
            return;
        }
        if (!dateOfBirth) {
            setErrorMessage("Date of birth field is required");
            return;
        }

        const result = await validatePatient({ nhsNumber: nhsNumber.toString(), surname, dateOfBirth });

        if (!result.success) {
            setErrorMessage(result.message);
            return;
        }
        
        router.push("/questionnaire");
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>

                <label className={styles.label} htmlFor="nhsNumber">NHS Number:</label>
                <input
                    id="nhsNumber"
                    type="number"
                    name="nhsNumber"
                    value={nhsNumber || ""}
                    onChange={(e) => setNhsNumber(e.target.value === "" ? null : Number(e.target.value))}
                    required
                    className={styles.input}
                />
                
                <label className={styles.label} htmlFor="surname">Surname: </label>
                <input
                    id="surname"
                    type="text"
                    name="surname"
                    value={surname || ""}
                    onChange={(e) => setSurname(e.target.value)}
                    required
                    className={styles.input}
                />
            
                <label className={styles.label} htmlFor="dateOfBirth">Date of Birth: </label>
                <input
                    id="dateOfBirth"
                    type="date"
                    value={dateOfBirth || ""}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                    className={styles.input}
                />
                
                {errorMessage && (
                        <ValidationErrorMessage message={errorMessage} />
                )}

                <button type="submit" className={styles.submitButton} role="button" aria-label="Continue">Continue</button>
                
            </form>
        </div>
      
        
    )
}

export default ValidateUserForm;