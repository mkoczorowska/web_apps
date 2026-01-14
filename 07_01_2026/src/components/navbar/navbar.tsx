import styles from './navbar.module.scss'

export default function Navbar() {
    return <nav className={styles.Navbar}>
        <ul>
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="/categories">Categories</a>
            </li>
            <li>
                <a href="/posts">Posts</a>
            </li>
        </ul>
    </nav>
}