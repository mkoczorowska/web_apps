function ProductList({ products }) {

    const format = new Intl.NumberFormat("pl-PL", {
        style: "currency",
        currency: "PLN"
    });

    const sum = products.reduce(
        (total, p) => total + p.price * p.quantity,
        0
    );

    return (
        <table className="table table-striped table-hover">

            <thead className="table-dark">
            <tr>
                <th>Nazwa</th>
                <th>Kategoria</th>
                <th>Cena</th>
                <th>Ilość</th>
                <th>Wartość</th>
            </tr>
            </thead>

            <tbody>
            {products.map((p) => (
                <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>{format.format(p.price)}</td>
                    <td>{p.quantity}</td>
                    <td>{format.format(p.price * p.quantity)}</td>
                </tr>
            ))}
            </tbody>

            <tfoot>
            <tr>
                <th colSpan="4">Suma wartości widocznych produktów:</th>
                <th>{format.format(sum)}</th>
            </tr>
            </tfoot>

        </table>
    );
}

export default ProductList;