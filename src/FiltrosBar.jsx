import "./FiltrosBar.css";

export default function FiltrosBar({
  filtroDepartamento,
  setFiltroDepartamento,
  departamentos,
  busqueda,
  setBusqueda,
  filtroInstitucion,
  setFiltroInstitucion,
  instituciones,
  esAdmin,
  onNuevoRegistro,
  setPaginaActual,
}) {
  return (
    <div className="filters-bar">
      {/* Filtro por Departamento */}
      <select
        value={filtroDepartamento}
        onChange={(e) => {
          setFiltroDepartamento(e.target.value);
          setPaginaActual(1);
        }}
        className="select-filter"
      >
        <option value="">📍 Filtrar por Departamento...</option>
        {departamentos.map((depto, idx) => (
          <option key={idx} value={depto}>
            {depto}
          </option>
        ))}
      </select>

      {/* Buscador por Nombre del Funcionario / Apellidos / Cargo */}
      <input
        type="text"
        placeholder="🔍 Buscar por nombre, apellidos o cargo..."
        value={busqueda}
        onChange={(e) => {
          setBusqueda(e.target.value);
          setPaginaActual(1);
        }}
        className="input-search"
      />

      {/* Filtro por Ministerio */}
      <select
        value={filtroInstitucion}
        onChange={(e) => {
          setFiltroInstitucion(e.target.value);
          setPaginaActual(1);
        }}
        className="select-filter"
      >
        <option value="">🏢 Filtrar por Institución...</option>
        {instituciones.map((min, idx) => (
          <option key={idx} value={min}>
            {min}
          </option>
        ))}
      </select>

      {/* Botón de Nuevo Registro (Solo Administradores) */}
      {esAdmin && (
        <button onClick={onNuevoRegistro} className="btn-new-record">
          ➕ Nuevo Registro
        </button>
      )}
    </div>
  );
}
