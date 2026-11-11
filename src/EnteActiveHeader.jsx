import "./EnteActiveHeader.css";
import { esColorClaro } from "./utilFunction";

export default function EnteActiveHeader({
  enteSeleccionado,
  colorEnte,
  onRegresar,
}) {
  const tieneEnte = Boolean(enteSeleccionado);

  // Color por defecto si no se proporciona uno
  const bgColor = colorEnte || "#f7fafc";
  const isLight = esColorClaro(bgColor);

  // Definición dinámica de colores de texto según el fondo del Ente
  const textColor = isLight ? "#1E293B" : "#FFFFFF";
  const labelColor = isLight ? "#475569" : "rgba(255, 255, 255, 0.85)";
  const btnBg = isLight ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.2)";
  const borderColor = isLight
    ? "rgba(0, 0, 0, 0.15)"
    : "rgba(255, 255, 255, 0.3)";

  return (
    <div
      className="ente-active-header"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
        color: textColor,
      }}
    >
      {tieneEnte && (
        <div className="volver-wrapper">
          <button
            onClick={onRegresar}
            className="btn-regresar"
            title="Volver a Entes"
            style={{
              backgroundColor: btnBg,
              color: textColor,
              border: `1px solid ${borderColor}`,
            }}
          >
            <span className="flecha">←</span>
            <span className="texto-volver">
              Volver <span className="texto-largo">a Entes</span>
            </span>
          </button>
        </div>
      )}

      <div className="ente-info">
        <span className="ente-label" style={{ color: labelColor }}>
          ENTE ACTUAL:
        </span>
        <h2
          className="ente-titulo"
          title={enteSeleccionado}
          style={{ color: textColor }}
        >
          {enteSeleccionado || "TODOS LOS REGISTROS"}
        </h2>
      </div>
    </div>
  );
}
