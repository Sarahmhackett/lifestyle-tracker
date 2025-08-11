"use client";
import styles from "./lifestyleform.module.css";
import { submitLifestyleForm } from "../utils/submitLifestyleFormAPI";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface LifestyleFormProps {
    nhsNumber: string | null;
}

const LifestyleForm = ({ nhsNumber }: LifestyleFormProps) => {

    const router = useRouter();

    const [drink, setDrink] = useState<boolean | null>(null);
    const [smoke, setSmoke] = useState<boolean | null>(null);
    const [exercise, setExercise] = useState<boolean | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ drink, smoke, exercise, nhsNumber });

        if (drink === null || smoke === null || exercise === null) {
            alert("Please answer all questions before submitting.");
            return;
        }

        if (nhsNumber === null) {
            alert("NHS number is missing. Please log in again.");
            return;
        }

        try {
            const result = await submitLifestyleForm(drink, smoke, exercise, nhsNumber);
            console.log("Server response:", result);
            router.push("/results");

        } catch (err) {
            console.error(err);
            alert("Error submitting lifestyle data");
        }
      };


    return (
        <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.title}>Lifestyle Tracker</h1>

            <p className={styles.description}>
                Please answer the following questions to help us track your lifestyle and provide you with a personalised report.
            </p>

            {/* DRINK QUESTION */}
            <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>
                    Do you drink on more than 2 days per week?
                </legend>

                <div className={styles.radioItem}>
                    <input
                    type="radio"
                    name="drink"
                    value="true"
                    checked={drink === true}
                    onChange={() => setDrink(true)}
                    className={styles.radioInput}
                    required
                    />
                    <label htmlFor="drink alcohol yes" className={styles.radioLabel}>Yes</label>
                </div>

                <div className={styles.radioItem}>
                    <input 
                        type="radio" 
                        name="drink" 
                        value="false" 
                        checked={drink === false}
                        onChange={() => setDrink(false)}
                        className={styles.radioInput} 
                        required
                    />
                    <label htmlFor="drink alcohol no" className={styles.radioLabel}>No</label>
                </div>
            </fieldset>

            {/* SMOKE QUESTION */}
            <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>
                    Do you smoke?
                </legend>
                <div className={styles.radioItem}>
                    <input 
                        type="radio" 
                        name="smoke" 
                        value="true" 
                        checked={smoke === true}
                        onChange={() => setSmoke(true)}
                        className={styles.radioInput} 
                        required
                    />
                    <label htmlFor="smoke yes" className={styles.radioLabel}>Yes</label>
                </div>

                <div className={styles.radioItem}>
                    <input 
                        type="radio" 
                        name="smoke" 
                        value="false" 
                        checked={smoke === false}
                        onChange={() => setSmoke(false)}
                        className={styles.radioInput} 
                        required
                    />
                    <label htmlFor="smoke no" className={styles.radioLabel}>No</label>
                </div>
            </fieldset>

            {/* EXERCISE QUESTION */}
            <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>
                    Do you exercise for more than 1 hour per week?
                </legend>

                <div className={styles.radioItem}>
                    <input 
                        type="radio" 
                        name="exercise" 
                        value="true" 
                        checked={exercise === true}
                        onChange={() => setExercise(true)}
                        className={styles.radioInput}
                    />
                    <label htmlFor="exercise yes" className={styles.radioLabel}>Yes</label>
                </div>

                <div className={styles.radioItem}>
                    <input 
                        type="radio"
                        name="exercise"
                        value="false"
                        checked={exercise === false}
                        onChange={() => setExercise(false)}
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