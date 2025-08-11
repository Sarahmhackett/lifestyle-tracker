import styles from "./page.module.css";
import ValidateUserForm from "./components/ValidateUserForm";
import InfoContentBlock from "./components/InfoContentBlock";

export default function Home() {
  return (
    <div className={styles.page}>
      <ValidateUserForm />
      <InfoContentBlock />

    </div>
  );
}
