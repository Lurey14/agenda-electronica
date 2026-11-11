/**
 * Catálogo de iconos para los Entes, basado en Google Material Symbols
 * (https://fonts.google.com/icons). La fuente se sirve localmente desde el
 * paquete npm `material-symbols`, por lo que funciona sin acceso a internet.
 *
 * El valor guardado en `icono` es el nombre del símbolo (ej. "account_balance").
 * Cualquier nombre de https://fonts.google.com/icons es válido.
 */

// Sugeridos que se muestran primero en el selector (con etiqueta en español).
export const ICONOS_SUGERIDOS = [
  { id: "account_balance", label: "Edificio de Gobierno" },
  { id: "assured_workload", label: "Asamblea / Parlamento" },
  { id: "balance", label: "Justicia" },
  { id: "gavel", label: "Tribunal" },
  { id: "menu_book", label: "Constitución / Leyes" },
  { id: "policy", label: "Fiscalía / Investigación" },
  { id: "shield", label: "Protección / Defensoría" },
  { id: "military_tech", label: "Defensa / Fuerzas Armadas" },
  { id: "local_police", label: "Policía / Seguridad" },
  { id: "how_to_vote", label: "Órgano Electoral" },
  { id: "description", label: "Registro / Contraloría" },
  { id: "payments", label: "Economía / Finanzas" },
  { id: "local_hospital", label: "Salud" },
  { id: "school", label: "Educación" },
  { id: "work", label: "Trabajo / Gestión" },
  { id: "public", label: "Relaciones Exteriores" },
  { id: "groups", label: "Ciudadanía / Derechos" },
  { id: "location_city", label: "Gobierno Municipal" },
  { id: "eco", label: "Medio Ambiente" },
  { id: "flag", label: "Estado / Gobernación" },
  { id: "handshake", label: "Cooperación / Convenios" },
  { id: "agriculture", label: "Desarrollo Rural" },
  { id: "water_drop", label: "Agua" },
  { id: "electric_bolt", label: "Energía" },
  { id: "construction", label: "Obras Públicas" },
  { id: "forest", label: "Bosques / Tierras" },
  { id: "museum", label: "Cultura" },
  { id: "local_fire_department", label: "Bomberos / Emergencias" },
  { id: "family_restroom", label: "Familia / Niñez" },
  { id: "corporate_fare", label: "Empresa Pública" },
];

// Ids del catálogo SVG anterior → símbolo equivalente (datos ya guardados).
const ICONOS_LEGADO = {
  edificio: "account_balance",
  parlamento: "assured_workload",
  balanza: "balance",
  mazo: "gavel",
  constitucion: "menu_book",
  fiscalia: "policy",
  escudo: "shield",
  defensa: "military_tech",
  policia: "local_police",
  electoral: "how_to_vote",
  documento: "description",
  finanzas: "payments",
  salud: "local_hospital",
  educacion: "school",
  trabajo: "work",
  exteriores: "public",
  ciudadania: "groups",
  municipio: "location_city",
  ambiente: "eco",
  bandera: "flag",
};

export const ICONO_ENTE_DEFAULT = "account_balance";

/** Devuelve el nombre de símbolo a usar para un valor guardado. */
export function resolverIcono(id) {
  if (!id) return ICONO_ENTE_DEFAULT;
  return ICONOS_LEGADO[id] || id;
}

/** Etiqueta legible: la sugerida en español o el nombre del símbolo. */
export function etiquetaIcono(id) {
  const nombre = resolverIcono(id);
  return (
    ICONOS_SUGERIDOS.find((i) => i.id === nombre)?.label ||
    nombre.replace(/_/g, " ")
  );
}

/**
 * Normaliza lo que el usuario escribe o pega desde fonts.google.com/icons
 * ("Account Balance", "account_balance", `<span ...>account_balance</span>`).
 */
export function normalizarNombreIcono(texto) {
  return texto
    .replace(/<[^>]*>/g, "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
}
