import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function CartDrawer() {
  const { cart, isOpen, closeCart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0,
  );

  return (
    <>
      {/* Fondo oscuro */}
      {isOpen && (
        <div
          onClick={closeCart}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm 
               transition-opacity duration-500 z-40"
        ></div>
      )}

      {/* Panel lateral */}
      <div
        className={`
            fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50
            transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
            p-6 overflow-y-auto h-[70%] 
                animate-[fadeIn_0.4s_ease-in-out]
             ${
               isOpen
                 ? "translate-x-0 opacity-100"
                 : "translate-x-full opacity-0"
             }
`}
      >
        <div className="p-6 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold">Tu carrito</h2>
          <button onClick={closeCart}>✕</button>
        </div>

        <div className="p-6 overflow-y-auto h-[70%]">
          {cart.length === 0 ? (
            <p>Tu carrito está vacío</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between mb-4 animate-[fadeIn_0.3s]"
              >
                <div>
                  <p className="font-semibold">{item.nombre}</p>
                  <p>Cantidad: {item.cantidad}</p>
                  <p>${item.precio}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500"
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t">
          <h3 className="text-lg font-bold">Total: ${total}</h3>
          <button className="w-full bg-black text-white py-3 mt-4 rounded">
            Finalizar compra
          </button>
        </div>
      </div>
    </>
  );
}

export default CartDrawer;
