import { useContext, useState } from "react";
import { CartContext } from "../context/cartContext";
import Toast from "../components/Toast";

function Productos({ productos }) {
  const { addToCart } = useContext(CartContext);
  const [mensaje, setMensaje] = useState("");

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-8">Nuestros Productos</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img
              src={`http://localhost:5000/uploads/${producto.imagen}`}
              alt={producto.nombre}
              className="w-full h-60 object-cover"
            />

            <div className="p-5">
              <h3 className="text-lg font-semibold mb-2">{producto.nombre}</h3>

              <p className="text-gray-500 text-sm mb-4">
                {producto.descripcion}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-green-600">
                  ${producto.precio}
                </span>

                <button
                  onClick={() => {
                    addToCart(producto);
                    setMensaje("producto agregado al carrito");
                    setTimeout(() => {
                      setMensaje("");
                    }, 5000);
                  }}
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {mensaje && <Toast mensaje={mensaje} />}
    </div>
  );
}

export default Productos;
