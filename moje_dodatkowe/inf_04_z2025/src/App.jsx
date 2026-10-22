import { useState } from 'react';
import './App.css';

function App() {
    const [photos, setPhotos] = useState([
        {id: 0, alt: "Mak", filename: "obraz1.jpg", category: 1, downloads: 35},
        {id: 1, alt: "Bukiet", filename: "obraz2.jpg", category: 1, downloads: 43},
        {id: 2, alt: "Dalmatyńczyk", filename: "obraz3.jpg", category: 2, downloads: 2},
        {id: 3, alt: "Świnka morska", filename: "obraz4.jpg", category: 2, downloads: 53},
        {id: 4, alt: "Rotwailer", filename: "obraz5.jpg", category: 2, downloads: 43},
        {id: 5, alt: "Audi", filename: "obraz6.jpg", category: 3, downloads: 11},
        {id: 6, alt: "kotki", filename: "obraz7.jpg", category: 2, downloads: 22},
        {id: 7, alt: "Róża", filename: "obraz8.jpg", category: 1, downloads: 33},
        {id: 8, alt: "Świnka morska", filename: "obraz9.jpg", category: 2, downloads: 123},
        {id: 9, alt: "Foksterier", filename: "obraz10.jpg", category: 2, downloads: 22},
        {id: 10, alt: "Szczeniak", filename: "obraz11.jpg", category: 2, downloads: 12},
        {id: 11, alt: "Garbus", filename: "obraz12.jpg", category: 3, downloads: 321}
    ]);

    const [showFlowers, setShowFlowers] = useState(true);
    const [showAnimals, setShowAnimals] = useState(true);
    const [showCars, setShowCars] = useState(true);

    const downloadPhoto = (id) => {
        setPhotos(
            photos.map((photo) =>{
                if(photo.id === id){
                    return{
                        ...photo,
                        downloads: photo.downloads +1
                    };
                }
                return photo;
            })
        );
    }

    return (
        <>
            <h1>Kategorie zdjęć</h1>

            <div className="categories">
                <label>
                    <input
                        type="checkbox"
                        checked={showFlowers}
                        onChange={() => setShowFlowers(!showFlowers)}
                    />
                    Kwiaty
                </label>

                <label>
                    <input
                        type="checkbox"
                        checked={showAnimals}
                        onChange={() => setShowAnimals(!showAnimals)}
                    />
                    Zwierzęta
                </label>

                <label>
                    <input
                        type="checkbox"
                        checked={showCars}
                        onChange={() => setShowCars(!showCars)}
                    />
                    Samochody
                </label>
            </div>

            <div className="gallery">
                {photos
                    .filter((photo) => {
                        if (photo.category === 1) {
                            return showFlowers;
                        }

                        if (photo.category === 2) {
                            return showAnimals;
                        }

                        if (photo.category === 3) {
                            return showCars;
                        }

                        return false;
                    })
                    .map((photo) => (
                        <div className="photo" key={photo.id}>
                            <img
                                src={`/assets/${photo.filename}`}
                                alt={photo.alt}
                            />

                            <h4>Liczba pobrań: {photo.downloads}</h4>

                            <button onClick={() => downloadPhoto(photo.id)}>
                                Pobierz
                            </button>
                        </div>
                    ))}
            </div>
        </>
    );
}
export default App;
