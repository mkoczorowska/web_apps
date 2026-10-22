import { useState } from 'react'
import './App.css'

function App() {
    const kursy = ["Programowanie w C#", "Angular dla początkujących", "Kurs Django"];
    const [imieINazwisko, setImieINazwisko] = useState("");
    const [nrKursu, setNrKursu] = useState("");
    function zapisz(e){
        e.preventDefault();
        const numer = Number(nrKursu)
        if(nrKursu > kursy.length || nrKursu <= 0){
            console.log("Nieprawidłowy numer kursu")
        }
        else{
            console.log(ImieINazwisko);
            console.log(kursy[numer-1]);
        }
    }
    return (
        <div className="main">
            <h2>Liczba kursów: {kursy.length}</h2>
            <ol>
                {kursy.map((kurs, index)=>(
                    <li key={index}>{kurs}</li>
                ))}
            </ol>

            <form onSubmit={zapisz}>
                <div className="form-group">
                    <label htmlFor="imieINazwisko">Imię i nazwisko:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="imieINazwisko"
                        value={imieINazwisko}
                        onChange={(e) => setImieINazwisko(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="nrKursu">Numer kursu:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="nrKursu"
                        value={nrKursu}
                        onChange={(e) => setNrKursu(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Zapisz do kursu
                </button>
            </form>
        </div>
    )
}

export default App
