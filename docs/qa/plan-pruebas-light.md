# Plan de pruebas light — Agenda Electrónica TCP

**Versión:** 1.0 · **Fecha:** 11/11/2026 · **Tipo:** práctica académica SQA

## 1. Objetivo

Comprobar mediante pruebas manuales, unitarias y BDD que el directorio permite consultas a visitantes y operaciones administrativas a usuarios autenticados en la interfaz. Los datos de la agenda provienen de `src/funcionarios.json` y se guardan por medio del middleware de desarrollo de Vite.

## 2. Alcance

| Nivel/técnica | Herramienta | Cobertura |
|---|---|---|
| Smoke manual/exploratorio | Navegador, localhost | Carga, navegación, búsqueda/filtros y acceso por rol |
| Unitarias | Jest + Testing Library | Autenticación/sesión, operaciones de entes y validación del formulario |
| BDD/E2E | Cypress + Cucumber + Gherkin | Consulta visitante, acceso admin, rechazo de credenciales y validación requerida |
| Casos de prueba | Excel | Casos CP trazables a historias HU, pasos, resultado y evidencia |
| CI/CD | GitHub Actions | lint, Jest, build y BDD en push y pull request |

## 3. Roles

- **Visitante (HU-01):** navegar/filtrar entes y consultar funcionarios activos; no ve controles administrativos.
- **Administrador (HU-02):** después de iniciar sesión puede acceder a operaciones de gestión desde la interfaz.
- `admin` / `admin` se reserva a `.env.test`/CI. No reemplazar credenciales del `.env` personal.

## 4. Fuera de alcance y límites

- No hay base de datos: no se añadirá una. La fuente es JSON.
- No se implementarán API de producción, autorización del lado servidor, rediseño ni roles adicionales.
- El middleware JSON existe solo en Vite dev. `vite preview` no proporciona `/api/guardar-funcionarios`.
- La visibilidad condicional de React no protege el JSON ni ofrece seguridad real en servidor.

## 5. Ambiente de prueba

- Windows local y runner Linux de GitHub Actions.
- Node.js LTS y Yarn según lockfile.
- `http://127.0.0.1:5173`, iniciado con `vite --mode test` para BDD.
- Datos: JSON fuente actual; BDD no guarda datos. Se compara el hash antes/después.
- Chromium headless administrado por Cypress.
- Credenciales de prueba `admin` / `admin`, únicamente en modo test.

## 6. Estrategia y criterios

**Ejecución:** primero lint, Jest, build y BDD; luego smoke manual con sesión de navegador limpia. Registrar resultado esperado/obtenido, fecha, ejecutor, estado y ruta de evidencia. Diferenciar ejecución local y remota.

**Entrada:** dependencias instaladas del lockfile, JSON válido, variables de prueba aisladas y navegador disponible para smoke.

**Salida:** lint/Jest/build/BDD pasan; casos manuales reales quedan como PASS/FAIL/BLOQUEADO con evidencia; el JSON no cambia; solo declarar CI exitoso después del run verde de Actions.

## 7. Riesgos y mitigación

| Riesgo | Mitigación |
|---|---|
| Publicar `.env` | Ignorarlo en Git, usar `.env.test` y revisar estado antes de publicar |
| E2E altera JSON | Escenarios sin escrituras y verificación del hash antes/después |
| API no disponible en preview | Iniciar Vite en modo desarrollo para E2E |
| Nombres/datos de contacto en repo público | La estudiante eligió visibilidad pública; revisar contenido antes de subir |
| Auth solo frontend | Documentar la limitación; mantener demo en ámbito local |

## 8. Matriz de evidencia

| Punto requerido | Artefacto | Evidencia |
|---|---|---|
| Plan light | Este documento | Captura del plan |
| Smoke manual | `smoke-test-manual.md` | Capturas de navegador por rol |
| Jest | `src/**/__tests__` | Consola y reporte de cobertura |
| BDD Cypress/Cucumber/Gherkin | `cypress/e2e/agenda.feature` | Resultado y capturas Cypress |
| HUs positivas/negativas | `historias-usuario.md` | Matriz HU/CP |
| Casos Excel | `outputs/01a1cc82-77b9-7ca2-a9d9-4c471246a208/casos-prueba-agenda.xlsx` | Libro cumplimentado |
| Localhost | `yarn dev` / `yarn test:e2e` | Navegador en `127.0.0.1:5173` |
| CI/CD | `.github/workflows/qa.yml` | Run exitoso en GitHub Actions |
