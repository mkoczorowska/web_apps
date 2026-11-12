import { useState } from 'react';

function AddProductForm({ onAdd }) {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("Elektronika");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");

    function dodaj(e) {
        e.preventDefault();

        if (name.trim() === "") {
            alert("Podaj nazwę produktu!");
            return;
        }

        if (price === "" || Number(price) <= 0 || !Number.isFinite(Number(price))) {
            alert("Cena musi być liczbą dodatnią!");
            return;
        }

        if (quantity === "" || !Number.isInteger(Number(quantity)) || Number(quantity) <= 0) {
            alert("Ilość musi być dodatnią liczbą całkowitą!");
            return;
        }

        const newProduct = {
            id: Date.now(),
            name: name,
            category: category,
            price: Number(price),
            quantity: Number(quantity)
        };

        onAdd(newProduct);

        setName("");
        setCategory("Elektronika");
        setPrice("");
        setQuantity("");
    }

    return (
        <form onSubmit={dodaj}>

            <div className="mb-3">
                <label className="form-label">Nazwa produktu</label>
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Kategoria</label>
                <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="Elektronika">Elektronika</option>
                    <option value="Meble">Meble</option>
                    <option value="Akcesoria">Akcesoria</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Cena</label>
                <input
                    type="number"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Ilość</label>
                <input
                    type="number"
                    className="form-control"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </div>

            <button type="submit" className="btn btn-primary">
                Dodaj produkt
            </button>

        </form>
    );
}

export default AddProductForm;