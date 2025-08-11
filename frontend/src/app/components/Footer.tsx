import styles from "./footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer} role="contentinfo">
            <ul className={styles.footerList}>
                <li className={styles.footerListItem}>
                    <a href="#" className={styles.footerLink}>
                        Support
                    </a>
                </li>
                <li className={styles.footerListItem}>
                    <a href="#" className={styles.footerLink}>
                        Links
                    </a>
                </li>
                <li className={styles.footerListItem}>
                    <a href="#" className={styles.footerLink}>
                        Terms of use
                    </a>
                </li>
                <li className={styles.footerListItem}>
                    <a href="#" className={styles.footerLink}>
                        Cookies
                    </a>
                </li>
                <li className={styles.footerListItem}>
                    <a href="#" className={styles.footerLink}>
                        Accessibility
                    </a>
                </li>
                <li className={styles.footerListItem}>
                    <a href="#" className={styles.footerLink}>
                        Help Centre
                    </a>
                </li>

                
            </ul>
        </footer>
    )
}


export default Footer;