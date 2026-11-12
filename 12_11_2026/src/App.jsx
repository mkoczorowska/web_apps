import { useState } from 'react';
import './App.css';

import { products as dane } from "./data/products.js";

import AddProductForm from "./components/AddProductForm.jsx";
import ProductList from "./components/ProductList.jsx";
import Summary from "./components/Summary.jsx";

function App() {
    const [products, setProducts] = useState(dane);
    const [filter, setFilter] = useState("Wszystkie");

    function addProduct(newProduct) {
        setProducts([...products, newProduct]);
    }

    const filtrated = products.filter((p) =>
        filter === "Wszystkie" || p.category === filter
    );

    return (
        <div className="container mt-4">

            <h1 className="mb-4">Magazyn produktów</h1>

            <div className="card p-3 mb-4">
                <h2 className="mb-3">Dodaj produkt</h2>
                <AddProductForm onAdd={addProduct} />
            </div>

            <div className="mb-3">
                <label className="form-label">Filtruj produkty</label>

                <select
                    className="form-select"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="Wszystkie">Wszystkie</option>
                    <option value="Elektronika">Elektronika</option>
                    <option value="Meble">Meble</option>
                    <option value="Akcesoria">Akcesoria</option>
                </select>
            </div>

            <h2 className="mb-3">Lista produktów</h2>

            <ProductList products={filtrated} />

            <div className="card p-3 mt-4">
                <Summary products={products} />
            </div>

        </div>
    );
}

export default App;