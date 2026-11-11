import { useEffect, useRef, useState } from "react";
import { esColorClaro } from "./utilFunction";

export default function FuncionarioCard({
  f,
  index,
  esAdmin,
  onEditar,
  onEliminar,
  destacado = false,
}) {
  const estadoF = (f.estado || "Activo").toLowerCase();

  const [mostrarSelectorWp, setMostrarSelectorWp] = useState(false);

  // Si se llegó a esta tarjeta desde el buscador global, centrarla en pantalla
  const cardRef = useRef(null);
  useEffect(() => {
    if (destacado && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [destacado]);

  // Mensaje predeterminado institucional
  const textoMensaje = encodeURIComponent(
    "¡Hola!, le escribo desde el TCP - Sucre. ",
  );

  // Función para extraer y limpiar los números si hay varios (ej: "71234567 / 79876543")
  const obtenerNumerosCelular = (celularStr) => {
    if (!celularStr) return [];
    return celularStr
      .split(/[,/|]+/) // Separa por comas, barras o plecas verticales
      .map((num) => num.trim())
      .filter((num) => num.length > 4);
  };

  const listaCelulares = obtenerNumerosCelular(f.celular);

  const bgColorEnte = f.color || "#3182ce";
  const esClaro = esColorClaro(bgColorEnte);
  const textColorEnte = esClaro ? "#1E293B" : "#FFFFFF";

  const estiloEtiqueta = {
    padding: "2px 8px",
    borderRadius: "6px",
    fontWeight: "700",
    display: "inline-block",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  };

  return (
    <div
      ref={cardRef}
      className={`funcionario-card ${estadoF}${destacado ? " destacado" : ""}`}
    >
      <div>
        <div className="card-header-row">
          <span
            style={{
              ...estiloEtiqueta,
              backgroundColor: bgColorEnte,
              color: textColorEnte,
            }}
          >
            {`« ${f.ente || "SIN ENTE"} »`}
          </span>
          {esAdmin && (
            <div style={{ display: "flex", gap: "6px" }}>
              <button
                onClick={() => onEditar(f, index, false)}
                className="btn-edit-card"
              >
                ✏️ Editar
              </button>
              <button
                onClick={() => onEliminar(index, f.nombre_completo)}
                className="btn-delete-card"
              >
                🗑️ Borrar
              </button>
            </div>
          )}
        </div>
        <h3 className="funcionario-nombre">
          {f.nombre_completo || "Puesto Vacante"}
        </h3>
        {f.institucion && (
          <p style={{ margin: "0 0 10px 0" }}>
            <span
              style={{
                ...estiloEtiqueta,
                backgroundColor: "#f8fafc",
                color: "#1E293B",
                border: `1.5px solid ${bgColorEnte}`,
                fontSize: "0.85rem",
              }}
            >
              {f.institucion}
            </span>
          </p>
        )}
        <p className="funcionario-cargo">{f.cargo}</p>
        {f.unidad && <p className="funcionario-unidad">📍 {f.unidad}</p>}

        <div className="info-institutional">
          <div className="contact-box">
            {f.direccion && (
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8px",
                }}
              >
                <span>📍 {f.direccion}</span>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${f.direccion}, ${f.localidad || ""}, ${f.departamento || "Bolivia"}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Buscar ubicación en Google Maps"
                  style={{
                    textDecoration: "none",
                    fontSize: "1.1rem",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                    transition: "background-color 0.2s",
                    flexShrink: 0,
                  }}
                  className="map-icon-link"
                >
                  🗺️
                </a>
              </p>
            )}
            {f.localidad && (
              <p>
                <strong>Ciudad / Localidad:</strong> {f.localidad}
              </p>
            )}
            <p>
              <strong>Departamento:</strong> {f.departamento || "NACIONAL"}
            </p>
          </div>
        </div>
      </div>
      <div className="contact-box">
        {f.correo && (
          <p>
            📧 <a href={`mailto:${f.correo}`}>{f.correo}</a>
          </p>
        )}

        {/* GESTIÓN INTELIGENTE DE CELULAR Y WHATSAPP */}
        {listaCelulares.length === 1 && (
          <p className="contacto-item">
            📱 <strong>Cel:</strong>{" "}
            <a
              href={`https://wa.me/${listaCelulares[0].replace(/\D/g, "")}?text=${textoMensaje}`}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-link-directo"
              title="Abrir chat de WhatsApp"
            >
              {listaCelulares[0]} <span className="wp-icon">💬</span>
            </a>
          </p>
        )}

        {listaCelulares.length > 1 && (
          <div className="whatsapp-multi-container">
            <p
              className="contacto-item multi-trigger"
              onClick={() => setMostrarSelectorWp(!mostrarSelectorWp)}
            >
              📱 <strong>Cel:</strong> {f.celular}{" "}
              <span className="wp-badge" title="Múltiples números disponibles">
                💬 ({listaCelulares.length}) ▾
              </span>
            </p>

            {/* Menú desplegable para elegir a qué número escribir */}
            {mostrarSelectorWp && (
              <div className="whatsapp-dropdown-menu">
                <span className="dropdown-header">
                  Haz clic sobre el número:
                </span>
                {listaCelulares.map((num, idx) => (
                  <p>
                    <a
                      key={idx}
                      href={`https://wa.me/${num.replace(/\D/g, "")}?text=${textoMensaje}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dropdown-item-wp ml-2"
                      onClick={() => setMostrarSelectorWp(false)}
                    >
                      {" "}
                      💬 <strong>{num}</strong>
                    </a>
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {f.telefono && (
          <p>
            ☎️ <strong>Telf:</strong> {f.telefono}
          </p>
        )}

        {!f.correo && listaCelulares.length === 0 && !f.telefono && (
          <p className="no-contact">Sin datos de contacto</p>
        )}
      </div>
      {esAdmin && (
        <div className="info-institutional">
          <p>
            Estado:{" "}
            <span
              style={{
                color: estadoF === "activo" ? "#38a169" : "#e53e3e",
                fontWeight: "bold",
              }}
            >
              {f.estado || "Activo"}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
