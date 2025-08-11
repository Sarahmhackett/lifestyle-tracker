"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./validateuserform.module.css";
import router from "next/router";

const ValidateUserForm = () => {

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

        // const [year, month, day] = dateOfBirth.split("-");
        // const formattedDateOfBirth = `${day}-${month}-${year}`;

        // console.log("data from form: ", nhsNumber, surname, formattedDateOfBirth);

        // setNhsNumber(null);
        // setSurname("");
        // setDateOfBirth(null);

        try {
            const response = await fetch("http://localhost:5000/validation", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ nhsNumber, surname, dateOfBirth }),
            });
        
            if (!response.ok) {
              const errorData = await response.json();
              alert(errorData.error || "Validation failed");
              return;
            }
        
            const patientData = await response.json();
            console.log("Validation success:", patientData);
            
            router.push("/questionnaire");
        } catch (error) {
            alert("Something went wrong. Please try again.");
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