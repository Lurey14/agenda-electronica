export default function FormularioModal({
  formulario,
  esNuevo,
  setFormulario,
  onCancelar,
  onConfirmar,
}) {
  const validarYEnviar = (e) => {
    e.preventDefault();
    const nombreLimpio = (formulario.nombre_completo || "").trim();
    if (nombreLimpio === "") {
      alert(
        "⚠️ Error: El campo 'Nombre Completo' es estrictamente obligatorio para el registro.",
      );
      return;
    }

    onConfirmar(e);
  };
  return (
    <div className="modal-overlay">
      <form onSubmit={validarYEnviar} className="modal-content form">
        <h3>{esNuevo ? "➕ Añadir Nuevo Funcionario" : "✏️ Editar Datos"}</h3>

        <label>Nombre Completo (*):</label>
        <input
          type="text"
          value={formulario.nombre_completo || ""}
          onChange={(e) =>
            setFormulario({ ...formulario, nombre_completo: e.target.value })
          }
          required
        />

        <label>Ente:</label>
        <input
          type="text"
          value={formulario.ente || ""}
          readOnly={true}
          /*onChange={(e) =>
                setFormulario({ ...formulario, ente: e.target.value })
              }*/
        />
        <div className="form-grid-2">
          <div>
            <label>Institución:</label>
            <input
              type="text"
              value={formulario.institucion || ""}
              onChange={(e) =>
                setFormulario({ ...formulario, institucion: e.target.value })
              }
            />
          </div>
          <div>
            <label>Cargo:</label>
            <input
              type="text"
              value={formulario.cargo || ""}
              onChange={(e) =>
                setFormulario({ ...formulario, cargo: e.target.value })
              }
            />
          </div>
        </div>

        <label>Departamento (*):</label>
        <select
          value={formulario.departamento || "NACIONAL"}
          onChange={(e) =>
            setFormulario({ ...formulario, departamento: e.target.value })
          }
        >
          <option value="">Seleccione un departamento</option>
          <option value="BENI">BENI</option>
          <option value="CHUQUISACA">CHUQUISACA</option>
          <option value="COCHABAMBA">COCHABAMBA</option>
          <option value="LA PAZ">LA PAZ</option>
          <option value="ORURO">ORURO</option>
          <option value="PANDO">PANDO</option>
          <option value="POTOSI">POTOSI</option>
          <option value="SANTA CRUZ">SANTA CRUZ</option>
          <option value="TARIJA">TARIJA</option>
        </select>

        <label>Ciudad / Localidad:</label>
        <input
          type="text"
          value={formulario.localidad || ""}
          onChange={(e) =>
            setFormulario({ ...formulario, localidad: e.target.value })
          }
        />

        <label>Dirección:</label>
        <input
          type="text"
          value={formulario.direccion || ""}
          onChange={(e) =>
            setFormulario({ ...formulario, direccion: e.target.value })
          }
        />

        <div className="form-grid-2">
          <div>
            <label>Correo:</label>
            <input
              type="text"
              value={formulario.correo || ""}
              onChange={(e) =>
                setFormulario({ ...formulario, correo: e.target.value })
              }
            />
          </div>
          <div>
            <label>Celular:</label>
            <input
              type="text"
              value={formulario.celular || ""}
              onChange={(e) =>
                setFormulario({ ...formulario, celular: e.target.value })
              }
            />
          </div>
        </div>
        <label>Teléfono(s):</label>
        <input
          type="text"
          value={formulario.telefono || ""}
          onChange={(e) =>
            setFormulario({ ...formulario, telefono: e.target.value })
          }
        />

        <label>Estado de Intranet:</label>
        <select
          value={formulario.estado || "Activo"}
          onChange={(e) =>
            setFormulario({ ...formulario, estado: e.target.value })
          }
        >
          <option value="Activo">🟢 Activo (Visible para todos)</option>
          <option value="Inactivo">🔴 Inactivo (Oculto de la lista)</option>
        </select>

        <div className="modal-actions">
          <button
            type="button"
            onClick={onCancelar}
            className="btn-modal cancel"
          >
            Cancelar
          </button>
          <button type="submit" className="btn-modal success">
            💾 Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}
