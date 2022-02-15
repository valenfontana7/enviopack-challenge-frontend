import * as React from "react";
import { Home, Carrito, Exito, Fallo } from "./pages/index";
import { Routes, Route, Link } from "react-router-dom";
import "./styles/main.scss";

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/compra/exito" element={<Exito />} />
        <Route path="/compra/fallo" element={<Fallo />} />
      </Routes>
  );
}
