import lista_rezerwacje from './rezerwacje.js';
import './App.scss'
import {useState} from "react";

function App() {
    const [rezerwacje, setRezerwacje] = useState(lista_rezerwacje)
    const [filtr, setFiltr] = useState("wszystkie")
    const [klient, setKlient] = useState("")
    const [usluga,setUsluga] = useState("")
    const [fryzjer,setFryzjer] = useState("")
    const [data, setData] = useState("")
    const [cena,setCena]= useState("")
    function zmienPotwierdzenie(id)
    {
        setRezerwacje(rezerwacje.map(r=>
            r.id === id ? {...r, potwierdzona: !r.potwierdzona} : r))
    }

    function dodaj(e){
        e.preventDefault()
        const nowaRezerwacja = {
            id: rezerwacje.length > 0 ? Math.max(...rezerwacje.map(r => r.id)) + 1 : 1,
            klient: klient,
            usluga: usluga,
            fryzjer: fryzjer,
            data: data,
            cena: Number(cena),
            potwierdzona: false
        }
        setRezerwacje([...rezerwacje, nowaRezerwacja])

        setKlient("");
        setUsluga("");
        setFryzjer("");
        setData("");
        setCena("");
    }
    return(
        <div>
            <select value={filtr} onChange={(e)=>setFiltr(e.target.value)}>
                <option value={"wszystkie"}>Wszystkie</option>
                <option value={"potwierdzone"}>Potwierdzone</option>
                <option value={"niepotwierdzone"}>Niepotwierdzone</option>
            </select>
            <table>
                <thead>
                    <tr>
                        <th>Lp.</th>
                        <th>Imię i Nazwisko</th>
                        <th>Usługa</th>
                        <th>Fryzjer</th>
                        <th>Data</th>
                        <th>Cena</th>
                        <th>Czy potwierdzona</th>
                    </tr>
                </thead>
                <tbody>
                    {rezerwacje.filter((rezerwacja)=> {
                        if (filtr === "potwierdzone") {
                            return rezerwacja.potwierdzona === true
                        } else if (filtr === "niepotwierdzone") {
                            return rezerwacja.potwierdzona === false
                        } else {
                            return true;
                        }
                    }).map((rezerwacja)=>(
                        <tr key={rezerwacja.id}>
                            <td>{rezerwacja.id}</td>
                            <td>{rezerwacja.klient}</td>
                            <td>{rezerwacja.usluga}</td>
                            <td>{rezerwacja.fryzjer}</td>
                            <td>{rezerwacja.data}</td>
                            <td>{rezerwacja.cena}</td>
                            <td><input type={"checkbox"} checked={rezerwacja.potwierdzona} onChange={()=>zmienPotwierdzenie(rezerwacja.id)}/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <form onSubmit={dodaj}>
                <input type={"text"} placeholder={"Imię i nazwisko"} value={klient} onChange={(e)=>setKlient(e.target.value)}/>
                <input type={"text"} placeholder={"Usługa"} value={usluga} onChange={(e)=>setUsluga(e.target.value)}/>
                <input type={"text"} placeholder={"Fryzjer"} value={fryzjer} onChange={(e)=>setFryzjer(e.target.value)}/>
                <input type={"date"} placeholder={"Data"} value={data} onChange={(e)=>setData(e.target.value)}/>
                <input type={"number"} placeholder={"Cena"} value={cena} onChange={(e)=>setCena(e.target.value)}/>
                <button type="submit">Dodaj</button>
            </form>
        </div>
    )
}

export default App
