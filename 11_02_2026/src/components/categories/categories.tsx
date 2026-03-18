import styles from './categories.module.scss'

export default function Categories() {
    return <div className={styles.Categories}>
        <h1>Categories</h1>
        <p>What are you looking for?</p>
        <ul>
            <li>
                <a href="#">
                    Self-care
                </a>
            </li>
            <li>
                <a href="#">
                    Hairstyles
                </a>
            </li>
            <li>
                <a href="#">
                    Outfits
                </a>
            </li>
            <li>
                <a href="#">
                    Nails
                </a>
            </li>
            <li>
                <a href="#">
                    Edukacja
                </a>
            </li>
        </ul>

    </div>
}