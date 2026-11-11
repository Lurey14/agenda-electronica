import "material-symbols/outlined.css";
import { resolverIcono, etiquetaIcono } from "./iconosEntes";

export default function IconoEnte({ id, size = 28, className, title }) {
  return (
    <span
      className={`material-symbols-outlined${className ? ` ${className}` : ""}`}
      style={{ fontSize: size, width: size, height: size, overflow: "hidden" }}
      role="img"
      aria-label={title || etiquetaIcono(id)}
    >
      {resolverIcono(id)}
    </span>
  );
}
