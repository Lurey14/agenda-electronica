export default function FooterInstitucional({
  esAdmin,
  setEsAdmin,
  setMostrarLogin,
}) {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="footer-institucional">
      <div className="footer-section">
        <h3>📖 Agenda Electrónica</h3>
        <p>Uso exclusivo para personal de la Intranet.</p>
      </div>

      <div className="footer-section">
        <h3>ACCESOS</h3>
        <p>Consultas técnicas: Dirección de Sistemas.</p>
      </div>

      <div className="footer-actions-container">
        {!esAdmin ? (
          <button
            onClick={() => setMostrarLogin(true)}
            className="btn-admin-toggle login"
          >
            🔑 Acceso Administrador
          </button>
        ) : (
          <button
            onClick={() => setEsAdmin(false)}
            className="btn-admin-toggle logout"
          >
            🔒 Salir del Modo Admin
          </button>
        )}
      </div>

      <div className="footer-copyright">
        &copy; {anioActual === 2026 ? anioActual : "2026-" + anioActual}{" "}
        Tribunal Constitucional Plurinacional de Bolivia. Todos los derechos
        reservados.
      </div>
    </footer>
  );
}
