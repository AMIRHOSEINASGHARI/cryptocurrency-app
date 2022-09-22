import React from "react";
import { Route, Routes } from "react-router-dom";
//components
import Header from "./components/Header";
import Home from "./components/Home";
import Exchanges from "./components/Exchanges";
import Cryptocurrencies from "./components/Cryptocurrencies";
import CryptoDetails from "./components/CryptoDetails";
import News from "./components/News";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="/news" element={<News />} />
        <Route path="/crypto/:id" element={<CryptoDetails />} />
      </Routes>
    </div>
  );
};

export default App;
