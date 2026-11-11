# 🏛️ Agenda Electrónica - Intranet TCP Bolivia

Sistema web modular y responsivo desarrollado para el **Tribunal Constitucional Plurinacional de Bolivia**, diseñado para la gestión y consulta del directorio interno de funcionarios públicos.

## 🛠️ Arquitectura Tecnológica

La aplicación está construida sobre una arquitectura SPA (Single Page Application) desacoplada y modular:

- **Frontend:** React 19 + Vite 6 (JavaScript Moderno - ESM).
- **Estilos:** CSS3 Puro Estructurado (Diseño Responsivo adaptado al Manual de Marca Institucional).
- **Almacenamiento (Base de Datos):** Fichero estático `funcionarios.json` manipulado dinámicamente mediante una API en red local expuesta por el servidor de desarrollo.

---

## 🗂️ Estructura del Proyecto (Componentes Modulares)

El código ha sido segmentado siguiendo los estándares de desarrollo limpio:

- `index.html`: Puerta de entrada del portal con metadatos institucionales y el Favicon oficial.
- `src/main.jsx`: Motor de arranque e inyección de la aplicación en el DOM.
- `src/App.jsx`: Componente maestro. Gestiona los estados globales, autenticación, filtros y lógica de segmentación.
- `src/FuncionarioCard.jsx`: Sub-módulo para el renderizado elástico e independiente de las fichas telefónicas.
- `src/FormularioModal.jsx`: Formulario modal de alta/modificación con validación integrada.
- `src/ModalConfirmacion.jsx`: Ventana emergente de seguridad para confirmación de borrados.
- `src/Paginacion.jsx`: Barra elástica de paginación que optimiza el rendimiento (12 ítems por ciclo) en equipos de gama baja.
- `src/App.css`: Estilos unificados con la paleta de colores institucional (**Granate y Oro Metálico**).

---

## 🔑 Credenciales del Sistema de Administración

El modo de edición en vivo y manipulación del archivo JSON requiere la activación del rol maestro:

- **Usuario:** `admin`
- **Contraseña:** se configura en el archivo local `.env` mediante `VITE_ADMIN_PASSWORD`. No subas ese archivo al repositorio.

---

## 🚀 Instalación y Despliegue en Red Local

### 1. Requisitos Previos

Asegúrese de tener instalado [Node.js](https://nodejs.org) (versión 18 o superior) en el servidor de la intranet.

### 2. Instalación de Dependencias

Clone o copie la carpeta del proyecto en el servidor institucional y ejecute el comando para reconstruir los paquetes:

```bash
yarn install
```

### 3. Ejecución y Exposición a la Intranet

Para que la agenda electrónica pueda ser consultada por cualquier computadora conectada a la red local de la oficina, levante el servicio exponiendo el host:

```bash
yarn dev
```

_El sistema generará una dirección IP local en la consola (Ej: `http://192.168.1.50:5173`). Ese enlace debe ser publicado o mapeado en el portal interno del Tribunal._

---

## 📦 Compilación para Servidores de Producción (IIS / Apache)

Si se desea subir el sistema compilado y minificado a un servidor web tradicional, ejecute:

```bash
yarn build
```

Esto creará una carpeta optimizada llamada **`dist/`** en la raíz del proyecto. El contenido de esa carpeta está listo para ser copiado y servido directamente.

---

**Desarrollado y Optimizado para la Dirección de Sistemas e Informática del TCP.**

---

## 🧪 Práctica de Software Quality Assurance

Esta entrega mantiene el almacenamiento existente en `src/funcionarios.json`; no usa una base de datos. Los componentes y la lógica funcional de la agenda no se modifican.

### Ambiente local

```bash
corepack enable
yarn install
yarn dev
```

Abre la URL localhost que indica Vite. Para el escenario BDD, copia `.env.test.example` a `.env.test`; ese archivo local usa `admin` / `admin` solo como credenciales de prueba.

### Pruebas automatizadas

```bash
yarn lint
yarn test --runInBand
yarn test:coverage
yarn build
yarn test:e2e
```

La suite E2E inicia Vite en `127.0.0.1:5173` con modo `test` y ejecuta los escenarios Gherkin usando Cypress y Cucumber. No guardar datos durante esos escenarios; el archivo JSON fuente debe conservarse.

### Documentación y evidencias

- Plan: `docs/qa/plan-pruebas-light.md`
- Historias de usuario: `docs/qa/historias-usuario.md`
- Smoke manual: `docs/qa/smoke-test-manual.md`
- Casos Excel: `outputs/01a1cc82-77b9-7ca2-a9d9-4c471246a208/casos-prueba-agenda.xlsx`
- Workflow CI: `.github/workflows/qa.yml`
- Capturas y videos Cypress local: `evidence/cypress/` (generados al ejecutar BDD; excluidos de Git)

El workflow corre lint, Jest, build y Cypress en cada `push` y `pull_request`, y publica cobertura/capturas/videos como artifacts de la ejecución. Revisa la pestaña **Actions** del repositorio después de cada push.
