export default function ModalConfirmacion({
  abierto,
  nombre,
  onCancelar,
  onConfirmar,
}) {
  if (!abierto) return null;

  return (
    <div className="modal-overlay" style={{ zIndex: 110 }}>
      <div
        className="modal-content login"
        style={{ maxWidth: "400px", textAlign: "center" }}
      >
        <div style={{ fontSize: "40px", marginBottom: "10px" }}>⚠️</div>
        <h3 style={{ margin: "0 0 10px 0" }}>¿Confirmar Eliminación?</h3>
        <p
          style={{
            fontSize: "14px",
            color: "#475569",
            margin: "0 0 20px 0",
            lineHeight: "1.4",
          }}
        >
          Está a punto de eliminar permanentemente del directorio a:
          <br />
          <strong style={{ color: "var(--color-granate)" }}>
            {nombre || "Este puesto vacante"}
          </strong>
          .<br />
          Esta acción no se puede deshacer.
        </p>
        <div className="modal-actions">
          <button
            type="button"
            onClick={onCancelar}
            className="btn-modal cancel"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirmar}
            className="btn-modal"
            style={{ backgroundColor: "#e53e3e", color: "white" }}
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
