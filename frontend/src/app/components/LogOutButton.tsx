"use client";
import { useRouter } from "next/navigation";
import styles from "./logoutbutton.module.css";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to clear session");

      router.push("/");
    } catch (error) {
      alert("Logout failed: " + (error as Error).message);
    }
  };

  return (
    <button onClick={handleLogout} className={styles.logoutButton} role="button" aria-label="Log out">
      Log out
    </button>
  );
}
