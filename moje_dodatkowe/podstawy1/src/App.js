import { useState, useEffect } from 'react'
import './App.scss'

function App() {
    const [ksiazki, setKsiazki] = useState([
        { id: 1, tytul: "Wiedźmin", rok: 2019, kategoria: "fikcja" },
        { id: 2, tytul: "Projekt React", rok: 2024, kategoria: "gowno" },
        { id: 3, tytul: "JavaScript", rok: 2023, kategoria: "gowno" },
    ]);

    const [tytul, setTytul] = useState("");
    const [rok, setRok] = useState("");
    const [kategoria, setKategoria] = useState("");

    const [edytowanaId, setEdytowanaId] = useState(null);
    const [nowyTytul, setNowyTytul] = useState("");
    const [nowyRok, setNowyRok] = useState("");
    const [nowaKategoria, setNowaKategoria] = useState("");

    const [pokazFikcja, setPokazFikcja] = useState(true);
    const [pokazGowno, setPokazGowno] = useState(true);

    const [sortowanie, setSortowanie] = useState("az");

    const posortowane = (sortowanie ==="az" ? [...ksiazki].sort((a,b) => (a.tytul.localeCompare(b.tytul, "pl"))) : [...ksiazki].sort((a,b) => (b.tytul.localeCompare(a.tytul, "pl"))));

    const[wybranyRok, setWybranyRok] = useState("wszystkie");

    const widoczne = posortowane.filter((ksiazka)=>(wybranyRok==="wszystkie" || Number(wybranyRok) === ksiazka.rok)).filter((ksiazka)=>(pokazFikcja && ksiazka.kategoria === "fikcja") || (pokazGowno && ksiazka.kategoria === "gowno"));

    const [szukana, setSzukana] = useState("");
    const wynik = widoczne.filter((ksiazka)=>(ksiazka.tytul.toLowerCase().includes(szukana.toLowerCase())));

    const [blad, setBlad] = useState("");


    function Ksiazka({ tytul, rok, kategoria, onUsun, onEdytuj }) {
        return (
            <div>
                <h2>{tytul}</h2>
                <p>{rok}</p>
                <p>{kategoria}</p>
                <button onClick={() => onUsun()}>Usuń</button>
                <button onClick={() => onEdytuj()}>Edytuj</button>
            </div>
        );
    }

    function dodaj(e)
    {
        e.preventDefault();

        if (tytul.trim() === "") {
            setBlad("Podaj tytuł książki");
            return;
        }

        if (rok === "" || Number(rok) <= 0) {
            setBlad("Podaj prawidłowy rok");
            return;
        }

        if (kategoria.trim() === "") {
            setBlad("Podaj kategorię");
            return;
        }


        const nowaKsiazka = {
            id: Math.max(0, ...ksiazki.map(k => k.id)) + 1,
            tytul: tytul.trim(),
            rok: Number(rok),
            kategoria: kategoria.trim()
        };

        setKsiazki([...ksiazki, nowaKsiazka]);
        setTytul("");
        setRok("");
        setKategoria("");
        setBlad("");
    }

    function usun(id){
        setKsiazki(ksiazki.filter((ksiazka)=>ksiazka.id !== id));
    }

    function rozpocznijEdycje(ksiazka) {
        setEdytowanaId(ksiazka.id);
        setNowyTytul(ksiazka.tytul);
        setNowyRok(String(ksiazka.rok));
        setNowaKategoria(ksiazka.kategoria);
    }

    function edytuj(e, ksiazka) {
        e.preventDefault();

        if (nowyTytul.trim() === "" || nowyRok === "" || Number(nowyRok ) <= 0 || nowaKategoria.trim() === "") {
            return;
        }

        setKsiazki(ksiazki.map((element) =>
            element.id === ksiazka.id
                ? {
                    ...element,
                    tytul: nowyTytul.trim(),
                    rok: Number(nowyRok),
                    kategoria: nowaKategoria.trim()
                }
                : element
        ));

        setEdytowanaId(null);
        setNowyTytul("");
        setNowyRok("");
        setNowaKategoria("");
    }

    useEffect(()=>{
        console.log("zmieniono komponent");
    });

    return(
        <div>
            <h1>KSIĄŻKI</h1>
            <br/>

            <form onSubmit={dodaj}>
                <input value={tytul} onChange={(e)=>(setTytul(e.target.value))} placeholder={"Podaj tytul"}/>
                <input type={"number"} value={rok} onChange={(e)=>(setRok(e.target.value))} placeholder={"Podaj rok"}/>
                <input value={kategoria} onChange={(e)=>(setKategoria(e.target.value))} placeholder={"Podaj kategorie"}/>

                <button type="submit">Dodaj książkę</button>

            </form>
            {blad !== "" && <p>{blad}</p>}

            <br/>
            <label>
                <input type={"checkbox"} checked={pokazFikcja} onChange={(e)=>setPokazFikcja(e.target.checked)}/>
                fikcja
            </label>
            <label>
                <input type={"checkbox"} checked={pokazGowno} onChange={(e)=>setPokazGowno(e.target.checked)}/>
                gówno
            </label>


            <select value={wybranyRok} onChange={(e)=>(setWybranyRok(e.target.value))}>
                <option value={"wszystkie"}>wszystkie</option>
                <option value={"2023"}>2023</option>
                <option value={"2024"}>2024</option>
            </select>

            <br/>

            <label>
                <input
                    type="radio"
                    name="sortowanie"
                    value="az"
                    checked={sortowanie === "az"}
                    onChange={(e) => setSortowanie(e.target.value)}
                />
                A–Z
            </label>

            <label>
                <input
                    type="radio"
                    name="sortowanie"
                    value="za"
                    checked={sortowanie === "za"}
                    onChange={(e) => setSortowanie(e.target.value)}
                />
                Z–A
            </label>

            <br/>

            <input placeholder={"Szukaj"} value={szukana} onChange={(e)=>(setSzukana(e.target.value))}/>
            {wynik.length !== 0 && <p>Liczba znalezionych książek: {wynik.length}</p>}

            {/* WYŚWIETLANIE KSIĄŻEK */}
            {(wynik.length === 0) ?
                (<div><p>Brak książek</p></div>)
                :
                (wynik.map((ksiazka) =>(
                    <div key={ksiazka.id}>
                        <br/>
                        <Ksiazka
                            tytul={ksiazka.tytul}
                            rok={ksiazka.rok}
                            kategoria={ksiazka.kategoria}
                            onUsun={()=> usun(ksiazka.id)}
                            onEdytuj={()=> rozpocznijEdycje(ksiazka)}
                        />

                        {edytowanaId === ksiazka.id && (
                            <form onSubmit={(e) => edytuj(e, ksiazka)}>
                                <input
                                    value={nowyTytul}
                                    onChange={(e) => setNowyTytul(e.target.value)}
                                    placeholder="Podaj nowy tytuł"
                                />

                                <input
                                    type="number"
                                    value={nowyRok}
                                    onChange={(e) => setNowyRok(e.target.value)}
                                    placeholder="Podaj nowy rok"
                                />

                                <input
                                    value={nowaKategoria}
                                    onChange={(e) => setNowaKategoria(e.target.value)}
                                    placeholder="Podaj kategorię"
                                />

                                <button type="submit">Zapisz zmiany</button>

                                <button
                                    type="button"
                                    onClick={() => setEdytowanaId(null)}
                                >
                                    Anuluj
                                </button>
                            </form>
                        )}
                    </div>
                )))}

        </div>

    )
}

export default App
