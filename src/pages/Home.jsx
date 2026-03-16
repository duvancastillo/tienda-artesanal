import { Link } from "react-router-dom"

function Home() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">

      <img 
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
        alt="Artesanías"
        className="absolute w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative text-center text-white px-6">
        <h1 className="text-5xl font-bold mb-6">
          Artesanías hechas con pasión
        </h1>

        <Link
          to="/productos"
          className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
        >
          Ver productos
        </Link>
      </div>

    </section>
  )
}

export default Home