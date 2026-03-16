import { useEffect, useState } from "react";

export default function Admin() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [preview, setPreview] = useState(null);

  function cargarProductos() {
    fetch("http://localhost:5000/api/admin/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }

  useEffect(() => {
    cargarProductos();
  }, []);

  const agregarProducto = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("precio", precio);
    formData.append("descripcion", descripcion);

    if (imagen) {
      formData.append("imagen", imagen);
    }

    if (editandoId) {
      fetch(`http://localhost:5000/api/admin/productos/${editandoId}`, {
        method: "PUT",
        body: formData,
      }).then(() => {
        setEditandoId(null);
        cargarProductos();
      });
    } else {
      fetch("http://localhost:5000/api/admin/productos", {
        method: "POST",
        body: formData,
      }).then(() => {
        cargarProductos();
        setNombre("");
        setPrecio("");
        setDescripcion("");
        setImagen(null);
        setPreview(null);
      });
    }
  };
  function editarProducto(producto) {
    setNombre(producto.nombre);
    setPrecio(producto.precio);
    setDescripcion(producto.descripcion);
    setEditandoId(producto.id);
  }

  function eliminar(id) {
    fetch(`http://localhost:5000/api/admin/productos/${id}`, {
      method: "DELETE",
    }).then(cargarProductos);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6">Panel de administración</h2>

        <form
          onSubmit={agregarProducto}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            type="text"
            placeholder="Nombre del producto"
            value={nombre}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            type="number"
            placeholder="Precio"
            value={precio}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setPrecio(e.target.value)}
          />

          <textarea
            placeholder="Descripción"
            value={descripcion}
            className="border rounded-lg p-3 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setDescripcion(e.target.value)}
          />

          <input
            type="file"
            className="border rounded-lg p-3"
            onChange={(e) => {
              setImagen(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />

          <button
            type="submit"
            className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition md:col-span-2"
          >
            Subir producto
          </button>
        </form>
      </div>

      {preview && <img src={preview} className="w-40 rounded-lg mt-4" />}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4">Productos registrados</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`http://localhost:5000/uploads/${producto.imagen}`}
                  className="w-16 h-16 object-cover rounded"
                />

                <div>
                  <p className="font-semibold">{producto.nombre}</p>
                  <p className="text-gray-500">${producto.precio}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => editarProducto(producto)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>

                <button
                  onClick={() => eliminar(producto.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
