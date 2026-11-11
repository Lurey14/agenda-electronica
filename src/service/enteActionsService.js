/**
 * Servicio para manejar las operaciones administrativas de Entes (Crear, Editar y Eliminar)
 */

export const enteActionsService = {
  /**
   * Valida y crea un nuevo ente institucional en la lista general.
   * Como no hay una tabla separada de entes, se agrega un registro auxiliar o se define que
   * el nuevo ente aparezca asignándole un funcionario inicial o asegurando el color en los existentes.
   */
  crearEnte: (nombreNuevo, icono, funcionariosActuales, guardarFn) => {
    const nombreEnteLimpio = nombreNuevo.trim().toUpperCase();

    // Validar que no exista ya un ente con ese nombre
    const existe = funcionariosActuales.some(
      (item) => (item.ente || "SIN ENTE").toUpperCase() === nombreEnteLimpio,
    );

    if (existe) {
      alert(
        `Error: Ya existe un ente institucional con el nombre "${nombreEnteLimpio}".`,
      );
      return false;
    }

    // Como los entes se derivan de los funcionarios, creamos un registro inicial para anclar el ente y su icono
    const nuevoRegistroAncla = {
      departamento: "NACIONAL",
      localidad: "",
      ente: nombreEnteLimpio,
      color: "#3498db",
      icono,
      institucion: "",
      nombre_completo: "EDITAR FUNCIONARIO NUEVO",
      cargo: "",
      correo: "",
      celular: "",
      telefono: "",
      direccion: "",
      estado: "Inactivo",
    };

    const listaActualizada = [nuevoRegistroAncla, ...funcionariosActuales];
    guardarFn(listaActualizada);
    return true;
  },

  /**
   * Edita el nombre y/o icono de un ente.
   * Cambia masivamente el nombre y el icono a TODOS los funcionarios que pertenecen a dicho ente.
   */
  editarEnte: (
    nombreAnterior,
    nuevoNombre,
    nuevoIcono,
    funcionariosActuales,
    guardarFn,
  ) => {
    const nombreLimpio = nuevoNombre.trim().toUpperCase();

    // Validar si el nuevo nombre ya existe en otro ente distinto al actual
    if (nombreLimpio !== nombreAnterior) {
      const existeOtro = funcionariosActuales.some(
        (item) => (item.ente || "SIN ENTE").toUpperCase() === nombreLimpio,
      );
      if (existeOtro) {
        alert(`Error: Ya existe otro ente con el nombre "${nombreLimpio}".`);
        return false;
      }
    }

    // Actualización masiva en todos los funcionarios del ente
    const listaActualizada = funcionariosActuales.map((item) => {
      const enteActualItem = item.ente || "SIN ENTE";
      if (enteActualItem === nombreAnterior) {
        return {
          ...item,
          ente: nombreLimpio,
          icono: nuevoIcono,
        };
      }
      return item;
    });

    guardarFn(listaActualizada);
    return true;
  },

  /**
   * Elimina un ente y absolutamente todos los funcionarios que pertenecen a él.
   */
  eliminarEnte: (nombreEnteAEliminar, funcionariosActuales, guardarFn) => {
    const listaActualizada = funcionariosActuales.filter(
      (item) => (item.ente || "SIN ENTE") !== nombreEnteAEliminar,
    );

    guardarFn(listaActualizada);
    return true;
  },
};
