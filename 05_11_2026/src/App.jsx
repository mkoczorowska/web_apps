import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss'

function App() {
    const [elementy, setElementy] = useState([{id: 0, alt: "Mak", filename: "obraz1.jpg", category:1, downloads: 35},
        {id: 1, alt:"Bukiet", filename: "obraz2.jpg", category: 1, downloads: 43},
        {id: 2, alt:"Dalmatyńczyk", filename: "obraz3.jpg", category:2, downloads: 2},
        {id: 3, alt:"Świnka morska", filename: "obraz4.jpg", category:2, downloads: 53},
        {id: 4, alt:"Rotwailer", filename: "obraz5.jpg", category:2, downloads: 43},
        {id: 5, alt:"Audi", filename: "obraz6.jpg", category:3, downloads: 11},
        {id: 6, alt:"kotki", filename: "obraz7.jpg", category:2, downloads: 22},
        {id: 7, alt:"Róża", filename: "obraz8.jpg", category:1, downloads: 33},
        {id: 8, alt:"Świnka morska", filename: "obraz9.jpg", category:2, downloads: 123},
        {id: 9, alt:"Foksterier", filename: "obraz10.jpg", category:2, downloads: 22},
        {id: 10, alt:"Szczeniak", filename: "obraz11.jpg", category:2, downloads: 12},
        {id: 11, alt:"Garbus", filename: "obraz12.jpg", category:3, downloads: 321}]);

    const [kwiaty, setKwiaty] = useState(true);
    const [samochody, setSamochody] = useState(true);
    const [zwierzeta, setZwierzeta] = useState(true);

    function pobierz(id){
        setElementy(elementy.map((element) =>
        {
            if(element.id === id){
                return {
                    ...element,
                    downloads: element.downloads + 1
                };
            }
            return element;
        }))
    }

    return (
        <div>
            <h1>Kategorie zdjęć</h1>
            <div className="checkboxy">
                <div className="form-check form-switch" style={{margin: "5px"}}>
                    <input className="form-check-input" id="s1" type={"checkbox"} checked={kwiaty} onChange={(e) => setKwiaty(e.target.checked)}/>
                    <label className="form-check-label" htmlFor="s1">
                        Kwiaty
                    </label >
                </div>
                <div className="form-check form-switch" style={{margin: "5px"}}>
                    <input className="form-check-input" id="s2" type={"checkbox"} checked={samochody} onChange={(e) => setSamochody(e.target.checked)}/>
                    <label className="form-check-label" htmlFor="s2">
                        Samochody
                    </label>
                </div>
                <div className="form-check form-switch" style={{margin: "5px"}}>
                    <input className="form-check-input" id="s3" type={"checkbox"} checked={zwierzeta} onChange={(e) => setZwierzeta(e.target.checked)}/>
                    <label className="form-check-label" htmlFor="s3">
                        Zwierzęta
                    </label>
                </div>
            </div>

            <div className="galeria">
                {elementy.filter((element)=> {
                    if (element.category === 1) {
                        return(kwiaty)
                    }
                    if (element.category === 2) {
                        return(zwierzeta)
                    }
                    if (element.category === 3) {
                        return(samochody)
                    }
                }).map((element) => (
                    <div key={element.id}>
                        <img src={`src/assets/${element.filename}`} alt={element.alt}/>
                        <p>Liczba pobrań: {element.downloads}</p>
                        <button onClick={()=>pobierz(element.id)}>Pobierz</button>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default App
