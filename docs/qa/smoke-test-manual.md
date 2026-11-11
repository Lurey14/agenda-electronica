# Smoke test manual y exploratorio

**Ambiente previsto:** `http://127.0.0.1:5173` · **Roles:** visitante y administrador · **Datos:** JSON local

## Preparación

1. Desde la raíz instala dependencias y ejecuta `yarn dev`.
2. Abre la dirección localhost indicada por Vite y espera a que cargue el directorio.
3. Usa ventana privada o limpia la sesión para empezar como visitante.
4. Para revisar admin local, usa exclusivamente las credenciales configuradas para el entorno de práctica. No incluyas la contraseña en capturas.

## Checklist

| ID | Pasos | Resultado esperado | Estado/evidencia |
|---|---|---|---|
| SM-01 | Abrir localhost y esperar | Agenda visible, sin pantalla vacía ni error | PASS (manual, `127.0.0.1:5175`) |
| SM-02 | Escribir parte de un nombre en “Buscar ente” | Se filtra la lista; limpiar restaura entes | PASS (manual; coincidencia y vacío) |
| SM-03 | Buscar funcionario global y abrir resultado | Navega al ente y destaca el funcionario | Pendiente |
| SM-04 | Buscar nombre/cargo inexistente dentro de un ente | Mensaje de resultados vacíos | Pendiente |
| SM-05 | Revisar controles como visitante | No se muestran acciones administrativas | PASS (manual) |
| SM-06 | Intentar login con credencial incorrecta | Se rechaza; permanece visitante | PASS (BDD Cypress, CP-07) |
| SM-07 | Iniciar sesión con credencial local de prueba válida | Aparecen acciones de administrador | PASS (BDD Cypress, CP-06/08) |
| SM-08 | Abrir alta y cancelar | Se cierra el formulario sin guardar | PASS (BDD Cypress, CP-08) |
| SM-09 | Cerrar sesión | Desaparecen controles admin; consulta sigue disponible | Pendiente |
| SM-10 | Redimensionar a escritorio y móvil | La agenda sigue visible y navegable | Pendiente |
| SM-11 | Como administrador, pulsar “Exportar Excel” | Descarga un `.xlsx` con nombre `Directorio_TCP_Bolivia_...` | PASS (BDD Cypress, CP-13) |

## Registro de ejecución

| Fecha/hora | Navegador/versión | ID | Estado | Evidencia | Observaciones |
|---|---|---|---|---|---|
| 11/11/2026 | Chrome (localhost) | SM-01, SM-02, SM-05 | PASS | `evidence/cypress-local/CP-02-CP-04-visitante.png` | Inicio y filtro verificados manualmente; datos JSON sin editar |
| 11/11/2026 | Cypress headless | SM-06, SM-07, SM-08 | PASS | `evidence/cypress-local/` | Rechazo de login, sesión admin, formulario y cancelación |

Los casos pendientes deben ejecutarse antes de afirmar que el smoke exploratorio está completo. Las capturas BDD se guardan en `evidence/cypress-local/`; evita mostrar nombres, correos, teléfonos o contraseñas que no sean necesarios.
