import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Post from "./pages/Post/Post";
import Categories from "./pages/Categories/Categories";
import Posts from "./pages/Posts/Posts";
import Navbar from "./components/Navbar/Navbar";

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/post/:id" element={<Post />} />
                <Route path="/categories" element={<Categories />} />
            </Routes>
        </BrowserRouter>
    );
}