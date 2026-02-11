const categories = ['React', 'JavaScript', 'CSS', 'Backend'];


export default function Categories() {
    return (
        <section>
            <h2>Kategorie</h2>
            <ul>
                {categories.map(cat => (
                    <li key={cat}>{cat}</li>
                ))}
            </ul>
        </section>
    );
}