export default function AdminActions({
  esAdmin,
  funcionarios,
  fechaUpdate,
  onSalir,
}) {
  if (!esAdmin) return null;

  const exportarAExcel = async () => {
    const filasParaExportar = funcionarios.map((f, index) => ({
      "N°": index + 1,
      ENTE: f.ente || "",
      INSTITUCION: f.institucion || "",
      DEPARTAMENTO: f.departamento || "",
      LOCALIDAD: f.localidad || "",
      DIRECCION: f.direccion || "",
      CARGO: f.cargo || "",
      "NOMBRE COMPLETO": f.nombre_completo || "",
      EMAIL: f.correo || "",
      CELULAR: f.celular || "",
      TELÉFONO: f.telefono || "",
      "ESTADO INTRANET": f.estado || "Activo",
    }));

    // Inyectamos al final de la hoja la fila de METADATA para control del TCP
    filasParaExportar.push({
      "N°": "",
      ENTE: "SISTEMA_METADATA",
      INSTITUCION: "REGISTRO DE CONTROL DE INTRANET",
      DEPARTAMENTO: "",
      LOCALIDAD: "",
      DIRECCION: "",
      CARGO: "",
      "NOMBRE COMPLETO": "ÚLTIMA ACTUALIZACIÓN REGISTRADA EN EL SISTEMA:",
      EMAIL: fechaUpdate,
      CELULAR: "",
      TELÉFONO: "",
      "ESTADO INTRANET": "",
    });

    const XLSX = await import("xlsx");

    // Construcción del libro con SheetJS
    const hojaDeTrabajo = XLSX.utils.json_to_sheet(filasParaExportar);
    const libroDeTrabajo = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      libroDeTrabajo,
      hojaDeTrabajo,
      "Directorio TCP",
    );

    const anchosColumnas = [
      { wch: 6 } /* N° */,
      { wch: 22 } /* Ente */,
      { wch: 35 } /* Institucion */,
      { wch: 15 } /* Departamento */,
      { wch: 25 } /* Localidad */,
      { wch: 25 } /* Direccion */,
      { wch: 30 } /* Cargo */,
      { wch: 45 } /* Nombre Completo */,
      { wch: 28 } /* Correo */,
      { wch: 12 } /* Celular */,
      { wch: 15 } /* Telf */,
      { wch: 16 } /* Estado */,
    ];
    hojaDeTrabajo["!cols"] = anchosColumnas;

    const fechaLimpia = fechaUpdate.replace(/[\\/\s:]/g, "-");
    XLSX.writeFile(
      libroDeTrabajo,
      `Directorio_TCP_Bolivia_${fechaLimpia}.xlsx`,
    );
  };

  return (
    <div className="admin-header-actions">
      <button
        onClick={exportarAExcel}
        className="btn-admin-toggle"
        style={{ backgroundColor: "#107C41" }}
      >
        📥 Exportar Excel
      </button>
      <button onClick={onSalir} className="btn-admin-toggle logout">
        🔒 Salir
      </button>
    </div>
  );
}
