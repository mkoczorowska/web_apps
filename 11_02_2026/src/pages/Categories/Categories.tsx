import styles from "./categories.module.scss";

export default function Categories() {
    const categories = ["Nails", "Outfits", "Travel"];

    return (
        <div className={styles.Categories}>
            <h1>CATEGORIES</h1>
            <p>What are you looking for?</p>
            <ul>
                {categories.map((cat) => (
                    <li key={cat}>
                        <a href="#">{cat}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
