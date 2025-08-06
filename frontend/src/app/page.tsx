import styles from "./page.module.css";
import ValidateUserForm from "./components/ValidateUserForm";

export default function Home() {
  return (
    <div className={styles.page}>
      <ValidateUserForm />
    </div>
  );
}
