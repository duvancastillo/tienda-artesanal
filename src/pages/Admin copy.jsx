import { useEffect, useState } from "react";

export default function Admin() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [editandoId, setEditandoId] = useState(null);

  function cargarProductos() {
    fetch("http://localhost:5000/api/admin/productos")
      .then(res => res.json())
      .then(data => setProductos(data));
  }

  useEffect(() => {
    cargarProductos();
  }, []);

  function agregarProducto(e) {
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
        body: formData
      }).then(() => {
        setEditandoId(null);
        cargarProductos();
      });
    } else {
      fetch("http://localhost:5000/api/admin/productos", {
        method: "POST",
        body: formData
      }).then(() => {
        cargarProductos();
      });
    }
  }
  function editarProducto(producto) {
    setNombre(producto.nombre);
    setPrecio(producto.precio);
    setDescripcion(producto.descripcion);
    setEditandoId(producto.id);
  }

  function eliminar(id) {
    fetch(`http://localhost:5000/api/admin/productos/${id}`, {
      method: "DELETE"
    }).then(cargarProductos);
  }

  return (
    <div>
      <h1>🔧 Panel de Administración</h1>

      <form onSubmit={agregarProducto}>
        <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
        <input placeholder="Precio" value={precio} onChange={e => setPrecio(e.target.value)} />
        <input placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} />

        <input type="file" onChange={e => setImagen(e.target.files[0])} />

        <button>
          {editandoId ? "Actualizar Producto" : "Agregar Producto"}
        </button>
      </form>

      <h2>Productos</h2>
      {productos.map(p => (
        <div key={p.id}>
          {p.nombre} - ${p.precio}
          <button onClick={() => eliminar(p.id)}>❌</button>
          <button onClick={() => editarProducto(p)}>
            Editar
          </button>
        </div>
      ))}
    </div>
  );
}
