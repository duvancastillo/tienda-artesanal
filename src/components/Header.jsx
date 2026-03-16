import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";

function Header() {
  const { totalItems, openCart } = useContext(CartContext);
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if (totalItems > 0) {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 300);
    }
  }, [totalItems]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-tight">
          Artesanías <span className="text-gray-400">alma andina</span>
        </h1>

        {/* Navegación */}
        <nav className="hidden md:flex gap-10 text-sm font-medium text-gray-700">
          <a href="/" className="hover:text-black transition">
            Inicio
          </a>
          <Link to="/productos" className="hover:text-black transition">
            Productos
          </Link>

          <a href="/contacto" className="hover:text-black transition">
            Contacto
          </a>
        </nav>

        {/* Carrito */}

        <button
          onClick={openCart}
          className={`relative transition-transform ${
            animate ? "scale-125" : "scale-100"
          }`}
        >
          🛒
          <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-2">
            {totalItems}
          </span>
        </button>
      </div>
    </header>
  );
}

export default Header;
