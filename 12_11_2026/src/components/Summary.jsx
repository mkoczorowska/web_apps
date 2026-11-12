function Summary({ products }) {

    const format = new Intl.NumberFormat("pl-PL", {
        style: "currency",
        currency: "PLN"
    });

    const sum = products.reduce(
        (total, p) => total + p.price * p.quantity,
        0
    );

    return (
        <h4 className="mb-0">
            Łączna wartość magazynu: {format.format(sum)}
        </h4>
    );
}

export default Summary;