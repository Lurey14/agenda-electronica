import { useState, useEffect } from "react";
import "./EnteFormModal.css";
import {
  ICONOS_SUGERIDOS,
  ICONO_ENTE_DEFAULT,
  resolverIcono,
  etiquetaIcono,
  normalizarNombreIcono,
} from "../iconosEntes";
import IconoEnte from "../IconoEnte";

const MAX_RESULTADOS = 120;

export default function EnteFormModal({
  isOpen,
  mode,
  enteData,
  onClose,
  onSubmit,
}) {
  const [nombre, setNombre] = useState("");
  const [icono, setIcono] = useState(ICONO_ENTE_DEFAULT);
  const [busqueda, setBusqueda] = useState("");
  const [todosLosIconos, setTodosLosIconos] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setBusqueda("");
      if (mode === "edit" && enteData) {
        setNombre(enteData.nombre || "");
        setIcono(resolverIcono(enteData.icono));
      } else {
        setNombre("");
        setIcono(ICONO_ENTE_DEFAULT);
      }
    }
  }, [isOpen, mode, enteData]);

  // La lista completa (~4000 nombres) se carga solo cuando se abre el modal
  useEffect(() => {
    if (isOpen && todosLosIconos.length === 0) {
      import("../materialSymbolsNombres.json").then((m) =>
        setTodosLosIconos(m.default),
      );
    }
  }, [isOpen, todosLosIconos.length]);

  if (!isOpen) return null;

  const termino = normalizarNombreIcono(busqueda);
  const terminoTexto = busqueda.trim().toLowerCase();
  const opciones = !termino
    ? ICONOS_SUGERIDOS.map((i) => i.id)
    : [
        ...new Set([
          ...todosLosIconos.filter((n) => n === termino),
          ...ICONOS_SUGERIDOS.filter((i) =>
            i.label.toLowerCase().includes(terminoTexto),
          ).map((i) => i.id),
          ...todosLosIconos.filter((n) => n.includes(termino)),
        ]),
      ].slice(0, MAX_RESULTADOS);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nombreMayus = nombre.trim().toUpperCase();
    if (!nombreMayus) {
      alert("El nombre del ente es obligatorio.");
      return;
    }
    onSubmit(nombreMayus, icono);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: "520px" }}>
        <h3>
          {mode === "edit"
            ? "Editar Ente Institucional"
            : "Registrar Nuevo Ente"}
        </h3>

        {mode === "edit" && (
          <p
            style={{
              fontSize: "0.85rem",
              color: "#b91c1c",
              backgroundColor: "#fef2f2",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #fecaca",
            }}
          >
            ⚠️ <strong>Importante:</strong> Al cambiar el nombre o icono, se
            actualizará a <strong>todos</strong> los que pertenecen al ente.
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            marginTop: "12px",
          }}
        >
          <div>
            <label>Nombre del Ente (Se guardará en MAYÚSCULAS):</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value.toUpperCase())}
              placeholder="Ej: TRIBUNAL CONSTITUCIONAL PLURINACIONAL"
              required
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                textTransform: "uppercase",
              }}
            />
          </div>

          <div>
            <label>Icono del Ente:</label>
            <div className="icono-ente-seleccion">
              <span className="icono-ente-opcion seleccionado">
                <IconoEnte id={icono} size={26} />
              </span>
              <span className="icono-ente-nombre">
                {etiquetaIcono(icono)}
                <small>{icono}</small>
              </span>
            </div>
            <input
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar icono (en inglés, ej: bank, law, health) o pegar su nombre"
              className="icono-ente-buscador"
            />
            <div className="icono-ente-grid" role="radiogroup">
              {opciones.map((id) => (
                <button
                  key={id}
                  type="button"
                  role="radio"
                  aria-checked={icono === id}
                  title={etiquetaIcono(id)}
                  onClick={() => setIcono(id)}
                  className={`icono-ente-opcion${icono === id ? " seleccionado" : ""}`}
                >
                  <IconoEnte id={id} size={26} />
                </button>
              ))}
            </div>
            <span className="icono-ente-ayuda">
              {termino && opciones.length === 0
                ? "Sin resultados. "
                : !termino
                  ? "Iconos sugeridos. "
                  : opciones.length === MAX_RESULTADOS
                    ? `Mostrando los primeros ${MAX_RESULTADOS} resultados. `
                    : ""}
              Explore el catálogo completo en{" "}
              <a
                href="https://fonts.google.com/icons"
                target="_blank"
                rel="noreferrer"
              >
                fonts.google.com/icons
              </a>{" "}
              y pegue aquí el nombre del icono.
            </span>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn-modal cancel"
            >
              Cancelar
            </button>
            <button type="submit" className="btn-modal save">
              {mode === "edit" ? "Guardar Cambios" : "Crear Ente"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
