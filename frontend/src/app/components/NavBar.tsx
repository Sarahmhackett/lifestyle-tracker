import Image from "next/image";
import styles from "./navbar.module.css";

const NavBar = () => { 
    return (
        <nav className={styles.navigationBar} role="banner">
          <div className={styles.imageWrapper}>
            <Image src="/nhs-logo.png" alt="" fill className={styles.image} priority sizes="100px" />
          </div>
        </nav>
    )
}

export default NavBar;

