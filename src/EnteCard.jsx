import "./EnteCard.css";
import IconoEnte from "./IconoEnte";

export default function EnteCard({
  nombreEnte,
  icono,
  totalFuncionarios = 0,
  onClick,
  esAdmin,
  onEditar,
  onEliminar,
}) {
  return (
    <div
      className="ente-card"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {/* 1. Header superior con icono del ente y contador de registros */}
      <div className="ente-card-header">
        <div className="ente-icono">
          <IconoEnte id={icono} size={34} />
        </div>
        <div
          className="ente-contador"
          title={`Contiene ${totalFuncionarios} registros`}
        >
          <span className="ente-contador-numero">{totalFuncionarios}</span>
          <span className="ente-contador-label">
            {totalFuncionarios === 1 ? "registro" : "registros"}
          </span>
        </div>
      </div>

      {/* 2. Cuerpo central con el Nombre del Ente (crece hacia abajo si es largo) */}
      <div className="ente-card-body">
        <h3 className="ente-titulo">{nombreEnte || "SIN ENTE"}</h3>
      </div>

      {/* 3. Footer inferior con controles de Administrador */}
      <div className="ente-card-footer">
        {esAdmin && (onEditar || onEliminar) && (
          <div
            style={{ display: "flex", gap: "8px" }}
            onClick={(e) => e.stopPropagation()}
          >
            {onEditar && (
              <button
                onClick={() => onEditar(nombreEnte)}
                className="btn-card-admin btn-card-edit"
              >
                ✏️ Editar
              </button>
            )}
            {onEliminar && (
              <button
                onClick={() => onEliminar(nombreEnte)}
                className="btn-card-admin btn-card-delete"
              >
                🗑️ Borrar
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
