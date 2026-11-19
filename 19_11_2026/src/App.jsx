import { useState } from 'react'
import './App.css'
import products from './products'
import ProductCard from "./ProductCard.jsx";
import 'bootstrap/dist/css/bootstrap.css'

function App() {
    const [pokazElektronika, setPokazElektronika] = useState(true)
    const [pokazMeble, setPokazMeble] = useState(true)
    const [pokazAkcesoria, setPokazAkcesoria] = useState(true)

    const produkty = products.filter((produkt) => {
        return (
            (produkt.category === "Elektronika" && pokazElektronika) ||
            (produkt.category === "Meble" && pokazMeble) ||
            (produkt.category === "Akcesoria" && pokazAkcesoria)
        )
    })

    return (
        <div className={"container py-5"}>
            <div className={"row"}>
                <div className={"form-check form-switch col-12 my-3 p-0"}>
                    <h1>Galeria produktów</h1>
                    <div className={"col-12 d-flex gap-5 p-0 my-3"}>
                        <label htmlFor="elektronika" className="form-check-label" role="switch">Elektronika</label>
                        <input type="checkbox" id="elektronika" className="form-check-input" checked={pokazElektronika} onChange={(e) => setPokazElektronika(e.target.checked)} />

                        <label htmlFor="meble" className="form-check-label" role="switch">Meble</label>
                        <input type="checkbox" id="meble" className="form-check-input" checked={pokazMeble} onChange={(e) => setPokazMeble(e.target.checked)} />

                        <label htmlFor="akcesoria" className="form-check-label" role="switch">Akcesoria</label>
                        <input type="checkbox" id="akcesoria" className="form-check-input" checked={pokazAkcesoria} onChange={(e) => setPokazAkcesoria(e.target.checked)} />
                    </div>
                </div>
            </div>

            <div className={"row"}>
                {produkty.map((produkt) => (<ProductCard key={produkt.id} produkt={produkt} />))}
            </div>

        </div>
  )
}

export default App
