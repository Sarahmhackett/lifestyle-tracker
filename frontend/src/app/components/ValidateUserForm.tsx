"use client";
import { useState } from "react";
import styles from "./validateuserform.module.css";

const ValidateUserForm = () => {

    const [nhsNumber, setNhsNumber] = useState<number | null>(null);
    const [surname, setSurname] = useState<string>("");
    const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Form Validation
        if (nhsNumber === null || nhsNumber.toString().length !== 10) {
            alert("Please enter a valid NHS number.");
            return;
        }
        if (surname === "") {
            alert("Please enter a valid surname.");
            return;
        }
        if (dateOfBirth === null) {
            alert("Please enter a valid date of birth.");
            return;
        }

        if (!nhsNumber || !surname || !dateOfBirth) {
            alert("Please fill in all fields correctly.");
            return;
        }

        console.log("data from form: ", nhsNumber, surname, dateOfBirth);
      };


    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>

                <label className={styles.label}>NHS Number:</label>
                <input
                    type="number"
                    name="nhsNumber"
                    onChange={(e) => setNhsNumber(e.target.value === "" ? null : Number(e.target.value))}
                    required
                    className={styles.input}
                />
                
                <label className={styles.label}>Surname: </label>
                <input
                    type="text"
                    name="surname"
                    onChange={(e) => setSurname(e.target.value)}
                    required
                    className={styles.input}
                />
            
                <label className={styles.label}>Date of Birth: </label>
                <input
                    type="date"
                    name="dateOfBirth"
                    onChange={(e) =>
                        setDateOfBirth(e.target.value === "" ? null : new Date(e.target.value))
                      }                    required
                    className={styles.input}
                />
                
                <button type="submit" className={styles.submitButton}>Continue</button>
                
            </form>
        </div>
        
    )
}

export default ValidateUserForm;