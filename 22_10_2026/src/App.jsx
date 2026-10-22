import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

function App() {
    const [tytul, setTytul] = useState("")
    const [rodzaj, setRodzaj] = useState("")

    function dodaj(e){
        e.preventDefault()
        console.log("tytul: " + tytul+ "; rodzaj: " + rodzaj)
    }

    return (
        <form onSubmit={dodaj}>
            <div className="form-group">
                <label htmlFor="tytul">Tytuł filmu</label>
                <input type={"text"} id={"tytul"} className={"form-control"} value={tytul} onChange={(e)=>(setTytul(e.target.value))}/>
            </div>
            <div className="form-group">
                <label htmlFor="rodzaj">Rodzaj</label>
                <select className={"form-control"} name="rodzaj" onChange={(e)=>(setRodzaj(e.target.value))}>
                    <option value={0}></option>
                    <option value={1}>Komedia</option>
                    <option value={2}>Obyczajowy</option>
                    <option value={3}>Sensacyjny</option>
                    <option value={4}>Horror</option>
                </select>
            </div>
            <button className="btn btn-primary" type="submit">Dodaj</button>
        </form>
  )
}

export default App
