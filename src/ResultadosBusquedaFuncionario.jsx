import { esColorClaro } from "./utilFunction";

export default function ResultadosBusquedaFuncionario({
  resultados,
  onSeleccionar,
}) {
  if (resultados.length === 0) {
    return (
      <p className="no-results">
        No se encontraron funcionarios con ese nombre.
      </p>
    );
  }

  return (
    <div className="resultados-funcionario">
      <p className="resultados-funcionario-total">
        {resultados.length} funcionario(s) encontrado(s)
      </p>
      <ul className="resultados-funcionario-lista">
        {resultados.map((f, idx) => {
          const colorEnte = f.color || "#3182ce";
          return (
            <li key={idx}>
              <button
                type="button"
                className="resultado-funcionario-item"
                onClick={() => onSeleccionar(f)}
                title="Ir a la tarjeta del funcionario"
              >
                <span className="resultado-funcionario-nombre">
                  {f.nombre_completo}
                </span>
                <span
                  className="resultado-funcionario-ente"
                  style={{
                    backgroundColor: colorEnte,
                    color: esColorClaro(colorEnte) ? "#1E293B" : "#FFFFFF",
                  }}
                >
                  {`« ${f.ente || "SIN ENTE"} »`}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
