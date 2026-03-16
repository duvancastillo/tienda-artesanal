function Toast({ mensaje }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 bg-white border border-gray-200 shadow-xl rounded-lg overflow-hidden animate-slideIn">
      <div className="flex items-center gap-3 p-4">
        {/* Icono */}
        <div className="text-green-500 text-xl">✔</div>

        {/* Mensaje */}
        <p className="text-gray-800 font-medium">{mensaje}</p>
      </div>

      {/* Barra de progreso */}
      <div className="h-1 bg-green-500 animate-progress"></div>
    </div>
  );
}

export default Toast;
