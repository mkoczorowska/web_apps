import { useState } from 'react'
import './App.scss'

function App() {
    function dodaj(e){
        e.preventDefault()

        if(cena<0 || cena === "" || nazwa === ""){
            setBlad("Niepoprawne dane");
            return;
        }
        const nowyProdukt ={
            id: produkty.length +1,
            nazwa: nazwa,
            cena: cena
        }

        setProdukty([...produkty, nowyProdukt]);
        setNazwa("");
        setCena("");
        setBlad("");
    }

    function usunProdukt(id){
        setProdukty(produkty.filter((produkt)=>produkt.id !==id));
    }

    const [produkty, setProdukty] = useState([])
    const [nazwa, setNazwa] = useState("");
    const [cena, setCena] = useState("");
    const [blad, setBlad] = useState("");
    const [szukana, setSzukana] = useState("");
    const [edytowanyId, setEdytowanyId] = useState(null);

    return(
        <>
            <form onSubmit={dodaj}>
                <input placeholder={"Wpisz nazwę produktu"} value={nazwa} onChange={(e) => setNazwa(e.target.value)}/>
                <input placeholder={"Wpisz cenę produktu"} type="number" value={cena} onChange={(e) => setCena(e.target.value)}/>
                <button type="submit">Zatwierdz</button>
            </form>
            <div>
                <input placeholder={"Wpisz nazwę szukanego produktu"} value={szukana} onChange={(e)=>(setSzukana(e.target.value))}/>
            </div>

            {blad !== "" && <div><p>{blad}</p></div>}

            {(produkty.length === 0 ? (
                <div>
                    <p>Brak produktów</p>
                </div>
            ):(
                <div>
                    <p>Liczba produktów: {produkty.length}</p>
                </div>
            ))}

            <div>
                {produkty.filter((produkt) => (produkt.nazwa.toLowerCase().includes(szukana.toLowerCase()))).map((produkt)=>(
                    <div key ={produkt.id}>
                        <h2>{produkt.nazwa}</h2>
                        <p>{produkt.cena}</p>
                        <button onClick={()=>usunProdukt(produkt.id)}>Usuń</button>
                    </div>
                ))}
            </div>
        </>
  )
}

export default App
