
import { useState } from 'react'

function ProductCard({ produkt }) {

    const [likes, setLikes] = useState(produkt.likes)

    return (
        <div className="col-12 col-md-4 py-2">
            <div className="card h-100">

                <img
                    src={`./assets/${produkt.filename}`}
                    className="card-img-top"
                    alt={produkt.name}
                />

                <div className="card-body">
                    <h5 className="card-title">{produkt.name}</h5>

                    <p className="card-text">
                        {produkt.description}
                    </p>

                    <button className="btn btn-primary" onClick={() => setLikes(likes + 1)}>
                        Liczba polubień: {likes}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ProductCard
