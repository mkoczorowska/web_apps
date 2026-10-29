
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import { students as initialStudents } from "../data/students";

function App() {
    const [name, setName] = useState("");
    const [grade, setGrade] = useState("");
    const [results, setResults] = useState(initialStudents);
    const [selectedGrades, setSelectedGrades] = useState(false);

    function add(e) {
        e.preventDefault();

        if (name.trim() === "") {
            alert("Pola muszą być wypełnione!");
            return;
        }

        if (grade === "" || Number(grade) < 1 || Number(grade) > 6) {
            alert("Ocena musi być z zakresu 1-6!");
            return;
        }

        const new_result = {
            id: results.length + 1,
            name: name.trim(),
            grade: Number(grade)
        };

        setResults([...results, new_result]);
        setName("");
        setGrade("");
    }

    return (
        <div className="container ">
            <h1 className="m-3">Lista uczniów</h1>

            <form onSubmit={add} className=" m-3 p-3">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Imię i nazwisko
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="grade" className="form-label">
                        Ocena
                    </label>
                    <select
                        id="grade"
                        className="form-select"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                    >
                        <option value="">Wybierz ocenę</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">
                    Dodaj ucznia
                </button>
            </form>

            <div className="form-check form-switch m-3">
                <input
                    id="filter"
                    type="checkbox"
                    className="form-check-input"
                    checked={selectedGrades}
                    onChange={(e) => setSelectedGrades(e.target.checked)}
                />
                <label htmlFor="filter" className="form-check-label">
                    Pokaż tylko uczniów z oceną powyżej 3
                </label>
            </div>

            <table className="table table-striped ">
                <thead>
                <tr>
                    <th>Imię i nazwisko</th>
                    <th>Ocena</th>
                </tr>
                </thead>

                <tbody>
                {results.filter((element) => {
                    if (selectedGrades) {
                        return element.grade > 3;
                    } else {
                        return true;
                    }
                }).map((element) => (
                    <tr key={element.id}>
                        <td>{element.name}</td>
                        <td>{element.grade}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
