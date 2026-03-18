import React from 'react';
import './App.scss';
import {BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Homepage from "./components/homepage/homepage";
import Categories from "./components/categories/categories";
import Posts from "./components/posts/posts";

function App() {
  return (
      <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Homepage/>} />
            <Route path="/categories" element={<Categories/>} />
            <Route path="/posts" element={<Posts/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
