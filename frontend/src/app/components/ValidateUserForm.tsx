"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { validatePatient } from "../utils/validatePatientAPI";
import styles from "./validateuserform.module.css";

const ValidateUserForm = () => {

    const router = useRouter();

    const [nhsNumber, setNhsNumber] = useState<number | null>(null);
    const [surname, setSurname] = useState<string>("");
    const [dateOfBirth, setDateOfBirth] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Form Validation
        if (nhsNumber === null || nhsNumber.toString().length !== 9) {
            alert("Please enter a valid NHS number.");
            return;
        }
        if (surname === "") {
            alert("Please enter a valid surname.");
            return;
        }
        if (!dateOfBirth) {
            alert("Please enter a valid date of birth.");
            return;
        }

        try {
            const patientData = await validatePatient({ nhsNumber, surname, dateOfBirth });
            console.log("Validation success:", patientData);
            router.push("/questionnaire");
          } catch (error: any) {
            alert(error.message);
            console.error(error);
          }
      };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>

                <label className={styles.label}>NHS Number:</label>
                <input
                    type="number"
                    name="nhsNumber"
                    value={nhsNumber || ""}
                    onChange={(e) => setNhsNumber(e.target.value === "" ? null : Number(e.target.value))}
                    required
                    className={styles.input}
                />
                
                <label className={styles.label}>Surname: </label>
                <input
                    type="text"
                    name="surname"
                    value={surname || ""}
                    onChange={(e) => setSurname(e.target.value)}
                    required
                    className={styles.input}
                />
            
                <label className={styles.label}>Date of Birth: </label>
                <input
                    type="date"
                    value={dateOfBirth || ""}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                    className={styles.input}
                />

                <button type="submit" className={styles.submitButton}>Continue</button>
                
            </form>
        </div>
      
        
    )
}

export default ValidateUserForm;