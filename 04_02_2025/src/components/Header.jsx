import { NavLink } from 'react-router-dom';


export default function Header() {
    return (
        <header>
            <h2>React Blog</h2>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/posts">Posty</NavLink>
                <NavLink to="/categories">Kategorie</NavLink>
            </nav>
        </header>
    );
}