import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import CartDrawer from "./components/CartDrawer";
import Header from "./components/Header";
import Productos from "./pages/Productos";

function RutaPrivada({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/admin/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <CartDrawer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/productos"
          element={<Productos productos={productos} />}
        />

        <Route
          path="/admin"
          element={
            <RutaPrivada>
              <Admin />
            </RutaPrivada>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
