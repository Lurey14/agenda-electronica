import imagenEscudo from "./assets/tcp-logo.jpeg";
import "./HeaderInstitucional.css";

export default function HeaderInstitucional({
  esAdmin,
  contadorEdiciones,
  fechaUpdate,
}) {
  return (
    <header className="agenda-header">
      <div className="header-inner">
        {/* Marca e Información */}
        <div className="header-brand-group">
          <img
            src={imagenEscudo}
            alt="Escudo TCP Bolivia"
            className="escudo-oficial"
          />
          <div className="titles-block">
            <span className="institucion-sub">
              Tribunal Constitucional Plurinacional de Bolivia
            </span>
            <h1>
              Agenda Electrónica{" "}
              <span className="badge-intranet">Intranet</span>
            </h1>
            <p className="directorio-sub">
              Directorio Interno de Funcionarios
              {esAdmin && <span className="admin-pill">MODO ADMIN</span>}
            </p>
          </div>
        </div>

        {/* Metadatos y Acciones */}
        <div className="header-meta-group">
          <div className="last-update-tag">
            <span className="dot-live"></span>
            <span className="update-label">Actualizado:</span>
            <strong className="update-date">{fechaUpdate}</strong>
          </div>

          {esAdmin && (
            <button
              className="counter-btn"
              onClick={() =>
                alert(`Cambios guardados en esta sesión: ${contadorEdiciones}`)
              }
              title="Ver cambios realizados"
            >
              📊 Cambios: <strong>{contadorEdiciones}</strong>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
