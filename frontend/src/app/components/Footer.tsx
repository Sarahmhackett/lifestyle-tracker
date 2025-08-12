import styles from "./footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer} role="contentinfo" aria-label="website footer">
            <ul className={styles.footerList}>
                <li className={styles.footerListItem}>
                    <a href="" className={styles.footerLink}>
                        Support
                    </a>
                </li>
                <li className={styles.footerListItem}>
                    <a href="" className={styles.footerLink} aria-label="links">
                        Links
                    </a>
                </li>
                <li className={styles.footerListItem}>
                    <a href="" className={styles.footerLink} aria-label="terms of use">
                        Terms of use
                    </a>
                </li>
                <li className={styles.footerListItem}>
                    <a href="" className={styles.footerLink} aria-label="cookies">
                        Cookies
                    </a>
                </li>
                <li className={styles.footerListItem}>
                    <a href="" className={styles.footerLink} aria-label="accessibility">
                        Accessibility
                    </a>
                </li>
                <li className={styles.footerListItem}>
                    <a href="" className={styles.footerLink} aria-label="help centre">
                        Help Centre
                    </a>
                </li>
            </ul>
        </footer>
    )
}

export default Footer;