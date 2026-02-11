import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostsList from './pages/PostsList';
import PostDetails from './pages/PostDetails';
import Categories from './pages/Categories';
import Header from './components/Header';
import Footer from './components/Footer';


export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <main className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/posts" element={<PostsList />} />
                    <Route path="/posts/:id" element={<PostDetails />} />
                    <Route path="/categories" element={<Categories />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    );
}