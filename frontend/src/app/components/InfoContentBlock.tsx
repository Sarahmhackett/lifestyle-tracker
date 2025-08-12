import styles from "./infocontentblock.module.css";

const InfoContentBlock = () => {    
    return (
        <section className={styles.infoContentBlock}>
            <h2 className={styles.infoContentBlockTitle}>What is NHS Login?</h2>
            <p className={styles.infoContentBlockText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Morbi scelerisque interdum lacus, ut feugiat diam ultrices vitae.
            </p>
        </section>
    )
}

export default InfoContentBlock;