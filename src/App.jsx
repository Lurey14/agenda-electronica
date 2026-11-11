import { useEffect, useState, useMemo } from "react";
import datosIniciales from "./funcionarios.json";
import FuncionarioCard from "./FuncionarioCard";
import EnteCard from "./EnteCard";
import FormularioModal from "./FormularioModal";
import Paginacion from "./Paginacion";
import ModalConfirmacion from "./ModalConfirmacion";
import FooterInstitucional from "./FooterInstitucional";
import AdminActions from "./AdminActions";
import HeaderInstitucional from "./HeaderInstitucional";
import EnteActiveHeader from "./EnteActiveHeader";
import FiltrosBar from "./FiltrosBar";
import ResultadosBusquedaFuncionario from "./ResultadosBusquedaFuncionario";
import { authService } from "./authService";
import "./App.css";
import "./BuscadorHome.css";
import { enteActionsService } from "./service/enteActionsService";
import EnteFormModal from "./modals/EnteFormModal";

// Normaliza texto para búsquedas sin distinguir mayúsculas ni tildes
const normalizarTexto = (texto) =>
  (texto || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();

export default function App() {
  const registroMeta = datosIniciales.find(
    (item) => item.ente === "SISTEMA_METADATA",
  );
  const fechaInicialMeta = registroMeta
    ? registroMeta.ultima_actualizacion
    : "No registrada";

  const listaFuncionariosReales = datosIniciales.filter(
    (item) => item.ente !== "SISTEMA_METADATA",
  );

  const [funcionarios, setFuncionarios] = useState(listaFuncionariosReales);
  const [fechaUpdate, setFechaUpdate] = useState(fechaInicialMeta);

  const [enteSeleccionado, setEnteSeleccionado] = useState(() => {
    return localStorage.getItem("enteSeleccionado_agenda") || null;
  });
  const [colorEnteSeleccionado, setColorEnteSeleccionado] = useState(() => {
    return localStorage.getItem("enteColorSeleccionado_agenda") || null;
  });
  const [transicionEntrada, setTransicionEntrada] = useState(false);

  const [enteModalState, setEnteModalState] = useState({
    isOpen: false,
    mode: "create", // "create" o "edit"
    data: null, // { nombre, color }
  });

  const [busqueda, setBusqueda] = useState("");
  const [filtroDepartamento, setFiltroDepartamento] = useState("");
  const [filtroInstitucion, setFiltroInstitucion] = useState("");

  // Buscadores del homepage (vista de entes)
  const [busquedaEnte, setBusquedaEnte] = useState("");
  const [busquedaFuncionarioGlobal, setBusquedaFuncionarioGlobal] =
    useState("");
  // Funcionario al que se navega desde el buscador global
  const [funcionarioDestacado, setFuncionarioDestacado] = useState(null);

  const [contadorEdiciones, setContadorEdiciones] = useState(0);

  const [esAdmin, setEsAdmin] = useState(() =>
    authService.verificarSesionActiva(),
  );

  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const [editandoIndex, setEditandoIndex] = useState(null);
  const [formulario, setFormulario] = useState(null);
  const [esNuevo, setEsNuevo] = useState(false);

  const [modalBorrando, setModalBorrando] = useState({
    abierto: false,
    indexReal: null,
    nombre: "",
  });

  const [paginaActual, setPaginaActual] = useState(1);
  const [tarjetasPorPagina, setTarjetasPorPagina] = useState(12);

  const abrirModalNuevoEnte = () => {
    setEnteModalState({ isOpen: true, mode: "create", data: null });
  };

  const abrirModalEditarEnte = (enteObj) => {
    setEnteModalState({ isOpen: true, mode: "edit", data: enteObj });
  };

  const manejarGuardarEnteModal = (nombreNuevo, iconoNuevo) => {
    if (enteModalState.mode === "create") {
      const exito = enteActionsService.crearEnte(
        nombreNuevo,
        iconoNuevo,
        funcionarios,
        despacharGuardadoConTimestamp,
      );
      if (exito)
        setEnteModalState({ isOpen: false, mode: "create", data: null });
    } else {
      const nombreAnterior = enteModalState.data.nombre;
      const exito = enteActionsService.editarEnte(
        nombreAnterior,
        nombreNuevo,
        iconoNuevo,
        funcionarios,
        despacharGuardadoConTimestamp,
      );
      if (exito) {
        // Si el ente activo actual era el que editamos, actualizamos su nombre en pantalla
        if (enteSeleccionado === nombreAnterior) {
          setEnteSeleccionado(nombreNuevo);
        }
        setEnteModalState({ isOpen: false, mode: "create", data: null });
      }
    }
  };

  const requerirEliminarEnte = (nombreEnte, totalFuncs) => {
    if (
      window.confirm(
        `⚠️ ADVERTENCIA CRÍTICA:\n\n¿Estás seguro de eliminar el ente "${nombreEnte}"?\n\nSe eliminarán permanentemente los ${totalFuncs} funcionarios asociados a este ente. Esta acción no se puede deshacer.`,
      )
    ) {
      const exito = enteActionsService.eliminarEnte(
        nombreEnte,
        funcionarios,
        despacharGuardadoConTimestamp,
      );
      if (exito && enteSeleccionado === nombreEnte) {
        regresarAEntes();
      }
    }
  };

  useEffect(() => {
    const calcularTarjetasPorPantalla = () => {
      const ancho = window.innerWidth;
      if (ancho >= 2500) {
        setTarjetasPorPagina(24);
      } else if (ancho >= 1200) {
        setTarjetasPorPagina(12);
      } else {
        setTarjetasPorPagina(6);
      }
    };

    calcularTarjetasPorPantalla();
    window.addEventListener("resize", calcularTarjetasPorPantalla);
    return () =>
      window.removeEventListener("resize", calcularTarjetasPorPantalla);
  }, []);

  // Guardar ente seleccionado en localStorage
  useEffect(() => {
    if (enteSeleccionado) {
      localStorage.setItem("enteSeleccionado_agenda", enteSeleccionado);
    } else {
      localStorage.removeItem("enteSeleccionado_agenda");
    }
  }, [enteSeleccionado]);
  //guarda el color del ente seleccionado el localstorage tambien
  useEffect(() => {
    if (colorEnteSeleccionado) {
      localStorage.setItem(
        "enteColorSeleccionado_agenda",
        colorEnteSeleccionado,
      );
    } else {
      localStorage.removeItem("enteColorSeleccionado_agenda");
    }
  }, [colorEnteSeleccionado]);

  // Manejar selección de ente con efecto visual de entrada
  const seleccionarEnteConEfecto = (
    nombreEnte,
    colorEnte,
    funcionarioDestino = null,
    paginaDestino = 1,
  ) => {
    setTransicionEntrada(true);
    setTimeout(() => {
      setEnteSeleccionado(nombreEnte);
      setColorEnteSeleccionado(colorEnte);
      setFiltroDepartamento("");
      setFiltroInstitucion("");
      setBusqueda("");
      setPaginaActual(paginaDestino);
      setBusquedaEnte("");
      setBusquedaFuncionarioGlobal("");
      setFuncionarioDestacado(funcionarioDestino);
      setTransicionEntrada(false);
    }, 300);
  };


  const regresarAEntes = () => {
    setTransicionEntrada(true);
    setTimeout(() => {
      setEnteSeleccionado(null);
      setColorEnteSeleccionado(null);
      localStorage.removeItem("enteSeleccionado_agenda");
      localStorage.removeItem("enteColorSeleccionado_agenda");
      setTransicionEntrada(false);
    }, 300);
  };

  const entesResumen = useMemo(() => {
    const mapa = {};
    funcionarios.forEach((item) => {
      const nombreEnte = item.ente || "SIN ENTE";
      if (!mapa[nombreEnte]) {
        mapa[nombreEnte] = {
          nombre: nombreEnte,
          color: null,
          icono: null,
          cantidad: 0,
        };
      }
      // Tomar el primer color definido (un registro sin color no debe cambiar el del ente)
      if (!mapa[nombreEnte].color && item.color) {
        mapa[nombreEnte].color = item.color;
      }
      if (!mapa[nombreEnte].icono && item.icono) {
        mapa[nombreEnte].icono = item.icono;
      }
      mapa[nombreEnte].cantidad += 1;
    });

    // Convertimos a array y ordenamos alfabéticamente por el nombre del ente
    return Object.values(mapa)
      .map((ente) => ({ ...ente, color: ente.color || "#3498db" }))
      .sort((a, b) =>
      a.nombre.localeCompare(b.nombre, "es", { sensitivity: "accent" }),
    );
  }, [funcionarios]);

  const entesFiltrados = useMemo(() => {
    const texto = normalizarTexto(busquedaEnte);
    if (!texto) return entesResumen;
    return entesResumen.filter((e) =>
      normalizarTexto(e.nombre).includes(texto),
    );
  }, [entesResumen, busquedaEnte]);

  // 🔍 Buscador global de funcionarios (todos los entes)
  const resultadosFuncionarioGlobal = useMemo(() => {
    const texto = normalizarTexto(busquedaFuncionarioGlobal);
    if (!texto) return [];
    return funcionarios
      .filter((f) => {
        const coincideEstado = esAdmin
          ? true
          : (f.estado || "Activo").toLowerCase() === "activo";
        return (
          coincideEstado &&
          f.nombre_completo &&
          normalizarTexto(f.nombre_completo).includes(texto)
        );
      })
      .sort((a, b) => a.nombre_completo.localeCompare(b.nombre_completo));
  }, [funcionarios, busquedaFuncionarioGlobal, esAdmin]);

  const irAFuncionario = (f) => {
    const nombreEnte = f.ente || "SIN ENTE";
    const ente = entesResumen.find((e) => e.nombre === nombreEnte);
    // Misma lista (y orden) que mostrará el ente sin filtros, para ubicar la página
    const listaEnte = funcionarios
      .filter(
        (item) =>
          (item.ente || "SIN ENTE") === nombreEnte &&
          (esAdmin || (item.estado || "Activo").toLowerCase() === "activo"),
      )
      .sort((a, b) =>
        (a.nombre_completo || "Puesto Vacante").localeCompare(
          b.nombre_completo || "Puesto Vacante",
        ),
      );
    const idx = Math.max(listaEnte.indexOf(f), 0);
    seleccionarEnteConEfecto(
      nombreEnte,
      ente ? ente.color : f.color,
      f,
      Math.floor(idx / tarjetasPorPagina) + 1,
    );
  };

  // Listas desplegables dinámicas para departamentos
  const funcionariosDelEnte = useMemo(() => {
    if (!enteSeleccionado) return [];
    return funcionarios.filter(
      (f) => (f.ente || "SIN ENTE") === enteSeleccionado,
    );
  }, [funcionarios, enteSeleccionado]);

  const departamentos = useMemo(() => {
    return [
      ...new Set(funcionariosDelEnte.map((f) => (f.departamento || "").trim())),
    ]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
  }, [funcionariosDelEnte]);

  const intituciones = useMemo(() => {
    return [
      ...new Set(funcionariosDelEnte.map((f) => (f.institucion || "").trim())),
    ]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
  }, [funcionariosDelEnte]);

  // 🔍 FILTRADO Y ORDENACIÓN
  const funcionariosFiltrados = useMemo(() => {
    return funcionariosDelEnte
      .filter((f) => {
        const coincideEstado = esAdmin
          ? true
          : (f.estado || "Activo").toLowerCase() === "activo";

        const textoBusqueda = busqueda.toLowerCase();
        const coincideBusqueda =
          (f.nombre_completo || "").toLowerCase().includes(textoBusqueda) ||
          (f.cargo || "").toLowerCase().includes(textoBusqueda);

        const deptoLimpio = (f.departamento || "").trim();
        const coincideDepto =
          filtroDepartamento === "" || deptoLimpio === filtroDepartamento;

        const institucionLimpio = (f.institucion || "").trim();
        const coincideMinisterio =
          filtroInstitucion === "" || institucionLimpio === filtroInstitucion;

        return (
          coincideEstado &&
          coincideBusqueda &&
          coincideDepto &&
          coincideMinisterio
        );
      })
      .sort((a, b) => {
        const nombreA = a.nombre_completo || "Puesto Vacante";
        const nombreB = b.nombre_completo || "Puesto Vacante";
        return nombreA.localeCompare(nombreB);
      });
  }, [
    funcionariosDelEnte,
    esAdmin,
    busqueda,
    filtroDepartamento,
    filtroInstitucion,
  ]);

  const totalPaginas = Math.ceil(
    funcionariosFiltrados.length / tarjetasPorPagina,
  );
  const indiceUltimoItem = paginaActual * tarjetasPorPagina;
  const indicePrimerItem = indiceUltimoItem - tarjetasPorPagina;
  const funcionariosPaginados = funcionariosFiltrados.slice(
    indicePrimerItem,
    indiceUltimoItem,
  );

  // Quitar el resaltado después de unos segundos
  useEffect(() => {
    if (!funcionarioDestacado) return;
    const timer = setTimeout(() => setFuncionarioDestacado(null), 3000);
    return () => clearTimeout(timer);
  }, [funcionarioDestacado]);

  const controlarLogin = (e) => {
    e.preventDefault();
    const loginExitoso = authService.iniciarSesion(usuario, password);
    if (loginExitoso) {
      setEsAdmin(true);
      setMostrarLogin(false);
      setUsuario("");
      setPassword("");
    } else {
      alert("Credenciales maestras incorrectas");
    }
  };

  const manejarCerrarSesion = () => {
    authService.cerrarSesion();
    setEsAdmin(false);
  };

  const despacharGuardadoConTimestamp = async (listaNueva) => {
    const ahora = new Date();
    const dia = String(ahora.getDate()).padStart(2, "0");
    const mes = String(ahora.getMonth() + 1).padStart(2, "0");
    const anio = ahora.getFullYear();
    const horas = String(ahora.getHours()).padStart(2, "0");
    const minutos = String(ahora.getMinutes()).padStart(2, "0");
    const nuevaFechaString = `${dia}/${mes}/${anio} ${horas}:${minutos}`;

    const payloadFinal = [
      ...listaNueva,
      {
        ente: "SISTEMA_METADATA",
        ultima_actualizacion: nuevaFechaString,
      },
    ];

    try {
      const respuesta = await fetch("/api/guardar-funcionarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadFinal, null, 2),
      });
      if (respuesta.ok) {
        setFuncionarios(listaNueva);
        setFechaUpdate(nuevaFechaString);
        setEditandoIndex(null);
        setFormulario(null);
        setContadorEdiciones((prev) => prev + 1);
      }
    } catch {
      alert("Error de conexión con el servidor local");
    }
  };

  const iniciarEdicion = (f, index, nuevo = false) => {
    const originalIdx = nuevo
      ? null
      : funcionarios.findIndex(
          (orig) =>
            orig.nombre_completo === f.nombre_completo &&
            orig.cargo === f.cargo,
        );
    setEsNuevo(nuevo);
    setEditandoIndex(originalIdx);
    setFormulario({ ...f });
  };

  const enviarFormulario = (e) => {
    e.preventDefault();
    let listaActualizada = [...funcionarios];
    // Garantizar que el registro conserve el color e icono original de su ente
    const enteActual = entesResumen.find(
      (e) => e.nombre === (formulario.ente || "SIN ENTE"),
    );
    const registro = {
      ...formulario,
      color: formulario.color || enteActual?.color || "#3498db",
      ...(enteActual?.icono && !formulario.icono
        ? { icono: enteActual.icono }
        : {}),
    };
    if (esNuevo) listaActualizada.unshift(registro);
    else listaActualizada[editandoIndex] = registro;
    despacharGuardadoConTimestamp(listaActualizada);
  };

  const requerirEliminar = (indexEnPaginacion, nombre) => {
    const itemAEliminar = funcionariosPaginados[indexEnPaginacion];
    const originalIdx = funcionarios.findIndex(
      (orig) =>
        orig.nombre_completo === itemAEliminar.nombre_completo &&
        orig.cargo === itemAEliminar.cargo,
    );
    setModalBorrando({ abierto: true, indexReal: originalIdx, nombre });
  };

  const confirmarEliminar = () => {
    const listaActualizada = funcionarios.filter(
      (_, idx) => idx !== modalBorrando.indexReal,
    );
    despacharGuardadoConTimestamp(listaActualizada);
    setModalBorrando({ abierto: false, indexReal: null, nombre: "" });
    setPaginaActual(1);
  };

  return (
    <div className="agenda-container">
      <AdminActions
        esAdmin={esAdmin}
        funcionarios={funcionarios}
        fechaUpdate={fechaUpdate}
        onSalir={manejarCerrarSesion}
      />

      <HeaderInstitucional
        esAdmin={esAdmin}
        contadorEdiciones={contadorEdiciones}
        fechaUpdate={fechaUpdate}
      />

      {mostrarLogin && (
        <div className="modal-overlay">
          <form onSubmit={controlarLogin} className="modal-content login">
            <h3>Autenticación Maestra</h3>
            <input
              type="text"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="modal-actions">
              <button
                type="button"
                onClick={() => setMostrarLogin(false)}
                className="btn-modal cancel"
              >
                Cancelar
              </button>
              <button type="submit" className="btn-modal save">
                Ingresar
              </button>
            </div>
          </form>
        </div>
      )}

      {formulario && (
        <FormularioModal
          formulario={formulario}
          esNuevo={esNuevo}
          setFormulario={setFormulario}
          onCancelar={() => setFormulario(null)}
          onConfirmar={enviarFormulario}
        />
      )}

      <ModalConfirmacion
        abierto={modalBorrando.abierto}
        nombre={modalBorrando.nombre}
        onCancelar={() =>
          setModalBorrando({ abierto: false, indexReal: null, nombre: "" })
        }
        onConfirmar={confirmarEliminar}
      />

      {/* Contenedor principal con efecto de transición al entrar/salir de un ente */}
      <div
        style={{
          opacity: transicionEntrada ? 0 : 1,
          transform: transicionEntrada ? "scale(0.98)" : "scale(1)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          width: "100%",
        }}
      >
        {!enteSeleccionado ? (
          /* VISTA 1: SELECCIÓN DE ENTES */
          <div
            className="seleccion-entes-container"
            style={{ padding: "20px 0" }}
          >
            <div className="home-header">
              <h2>Seleccione el Ente Institucional</h2>
              <input
                type="text"
                placeholder="🔍 Buscar ente..."
                value={busquedaEnte}
                onChange={(e) => setBusquedaEnte(e.target.value)}
                className="input-search home-buscador"
              />
              <input
                type="text"
                placeholder="👤 Buscar funcionario..."
                value={busquedaFuncionarioGlobal}
                onChange={(e) => setBusquedaFuncionarioGlobal(e.target.value)}
                className="input-search home-buscador funcionario"
              />
              {esAdmin && (
                <button
                  onClick={abrirModalNuevoEnte}
                  style={{
                    backgroundColor: "var(--color-granate)",
                    color: "#fff",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  ➕ Añadir Nuevo ENTE
                </button>
              )}
            </div>
            {busquedaFuncionarioGlobal.trim() ? (
              <ResultadosBusquedaFuncionario
                resultados={resultadosFuncionarioGlobal}
                onSeleccionar={irAFuncionario}
              />
            ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "20px",
              }}
            >
              {entesFiltrados.length === 0 && (
                <p className="no-results">
                  No se encontraron entes con ese nombre.
                </p>
              )}
              {entesFiltrados.map((ente) => (
                <EnteCard
                  key={ente.nombre}
                  nombreEnte={ente.nombre}
                  icono={ente.icono}
                  totalFuncionarios={ente.cantidad}
                  onClick={() =>
                    seleccionarEnteConEfecto(ente.nombre, ente.color)
                  }
                  esAdmin={esAdmin}
                  onEditar={() => abrirModalEditarEnte(ente)}
                  onEliminar={() =>
                    requerirEliminarEnte(ente.nombre, ente.cantidad)
                  }
                />
              ))}
            </div>
            )}
          </div>
        ) : (
          /* VISTA 2: LISTA DE FUNCIONARIOS DEL ENTE SELECCIONADO */
          <>
            <EnteActiveHeader
              enteSeleccionado={enteSeleccionado}
              onRegresar={regresarAEntes}
              colorEnte={colorEnteSeleccionado}
            />

            {/* Componente Modular de Filtros */}
            <FiltrosBar
              filtroDepartamento={filtroDepartamento}
              setFiltroDepartamento={setFiltroDepartamento}
              departamentos={departamentos}
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              filtroInstitucion={filtroInstitucion}
              setFiltroInstitucion={setFiltroInstitucion}
              instituciones={intituciones}
              esAdmin={esAdmin}
              setPaginaActual={setPaginaActual}
              onNuevoRegistro={() =>
                iniciarEdicion(
                  {
                    ente: enteSeleccionado,
                    // Heredar el color original del ente
                    color:
                      colorEnteSeleccionado ||
                      funcionariosDelEnte.find((f) => f.color)?.color ||
                      "#3498db",
                    departamento: departamentos[0] || "NACIONAL",
                    ministerio: "",
                    unidad: "",
                    cargo: "",
                    nombre_completo: "",
                    correo: "",
                    celular: "",
                    telefono: "",
                    direccion: "",
                    estado: "Activo",
                  },
                  null,
                  true,
                )
              }
            />

            <Paginacion
              paginaActual={paginaActual}
              totalPaginas={totalPaginas}
              totalResultados={funcionariosFiltrados.length}
              onPaginaChange={setPaginaActual}
            />

            {/* Cuadrícula de Tarjetas de Funcionarios */}
            <div className="cards-grid">
              {funcionariosPaginados.map((f, index) => (
                <FuncionarioCard
                  key={index}
                  f={f}
                  index={index}
                  esAdmin={esAdmin}
                  onEditar={iniciarEdicion}
                  onEliminar={requerirEliminar}
                  destacado={f === funcionarioDestacado}
                />
              ))}
            </div>

            <Paginacion
              paginaActual={paginaActual}
              totalPaginas={totalPaginas}
              totalResultados={funcionariosFiltrados.length}
              onPaginaChange={setPaginaActual}
            />

            {funcionariosFiltrados.length === 0 && (
              <p className="no-results">
                No se encontraron funcionarios con los filtros aplicados.
              </p>
            )}
          </>
        )}
      </div>

      <div id="spacer"></div>
      <div className="ticks"></div>
      <FooterInstitucional
        esAdmin={esAdmin}
        setEsAdmin={setEsAdmin}
        setMostrarLogin={setMostrarLogin}
      />

      {/* Modal de Ente */}
      <EnteFormModal
        isOpen={enteModalState.isOpen}
        mode={enteModalState.mode}
        enteData={enteModalState.data}
        onClose={() =>
          setEnteModalState({ isOpen: false, mode: "create", data: null })
        }
        onSubmit={manejarGuardarEnteModal}
      />
    </div>
  );
}
