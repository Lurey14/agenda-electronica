import { useState, useEffect } from "react";

export default function Paginacion({
  paginaActual,
  totalPaginas,
  totalResultados,
  onPaginaChange,
}) {
  const [inputValue, setInputValue] = useState(paginaActual);

  useEffect(() => {
    setInputValue(paginaActual);
  }, [paginaActual]);

  if (totalPaginas <= 1) return null;

  const handleIrAPagina = (e) => {
    e.preventDefault();
    const numero = parseInt(inputValue, 10);

    if (!isNaN(numero) && numero >= 1 && numero <= totalPaginas) {
      if (numero !== paginaActual) {
        onPaginaChange(numero);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      setInputValue(paginaActual);
    }
  };

  return (
    <nav className="pagination-bar" aria-label="Navegación de páginas">
      {/* Botón Anterior */}
      <button
        onClick={() => {
          onPaginaChange(Math.max(paginaActual - 1, 1));
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        disabled={paginaActual === 1}
        className="btn-page"
        title="Página Anterior"
      >
        <span className="btn-icon">←</span>
        <span className="btn-text">Anterior</span>
      </button>

      {/* Bloque central en una sola línea */}
      <div className="pagination-center">
        <span className="page-label">Página</span>
        <form onSubmit={handleIrAPagina} className="jump-page-form">
          <input
            type="number"
            min="1"
            max={totalPaginas}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleIrAPagina}
            className="input-jump-page"
            title="Escribe la página y presiona Enter"
          />
        </form>
        <span className="page-label">
          de <strong>{totalPaginas}</strong>
        </span>
        <span className="total-records">({totalResultados})</span>
      </div>

      {/* Botón Siguiente */}
      <button
        onClick={() => {
          onPaginaChange(Math.min(paginaActual + 1, totalPaginas));
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        disabled={paginaActual === totalPaginas}
        className="btn-page"
        title="Página Siguiente"
      >
        <span className="btn-text">Siguiente</span>
        <span className="btn-icon">→</span>
      </button>
    </nav>
  );
}
