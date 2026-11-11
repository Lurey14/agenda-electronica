# Historias de usuario y criterios de aceptación

## HU-01 — Consulta como visitante

**Como** visitante de la intranet, **quiero** consultar y buscar funcionarios por ente, **para** encontrar información institucional vigente.

### Criterios de aceptación

- **Positivo:** se muestran los entes y se pueden consultar funcionarios activos.
- **Positivo:** la búsqueda por nombre o cargo actualiza resultados y permite regresar a entes.
- **Negativo:** la lista de visitante oculta funcionarios inactivos.
- **Negativo:** no hay controles de alta, edición, eliminación ni exportación administrativa.
- **Negativo:** una búsqueda sin coincidencias muestra un estado vacío comprensible.

| ID | Escenario | Tipo | Nivel |
|---|---|---|---|
| CP-01 | Carga inicial smoke | Positivo | Manual/BDD |
| CP-02 | Visitante abre ente y consulta activos | Positivo | BDD |
| CP-03 | Búsqueda con y sin coincidencias | Positivo/negativo | Manual |
| CP-04 | Visitante no ve controles administrativos | Negativo | BDD |
| CP-05 | Registro inactivo oculto a visitante | Negativo | Unitario/manual |

## HU-02 — Gestión como administrador

**Como** administrador de la agenda, **quiero** iniciar sesión y gestionar registros desde el modo admin, **para** mantener actualizado el directorio.

### Criterios de aceptación

- **Positivo:** credenciales de prueba válidas habilitan operaciones administrativas.
- **Positivo:** el formulario de alta acepta un envío con el nombre obligatorio presente.
- **Negativo:** contraseña errónea no activa admin ni crea sesión y avisa al usuario.
- **Negativo:** nombre vacío detiene el envío y muestra validación.
- **Negativo:** crear un ente duplicado se rechaza.
- **Negativo:** cancelar confirmación de borrado conserva los registros.
- **Positivo:** cerrar sesión elimina datos de sesión y oculta herramientas admin.

| ID | Escenario | Tipo | Nivel |
|---|---|---|---|
| CP-06 | Login con credenciales de prueba | Positivo | Jest/BDD |
| CP-07 | Login con contraseña incorrecta | Negativo | Jest/BDD |
| CP-08 | Admin ve controles y abre formulario de alta | Positivo | BDD |
| CP-09 | Nombre de funcionario vacío | Negativo | Jest/BDD |
| CP-10 | Rechazo de ente duplicado | Negativo | Jest |
| CP-11 | Cierre de sesión | Positivo | Jest/manual |
| CP-12 | Cancelar confirmación de eliminación | Negativo | Manual |

## Registro de ejecución

- **PASS:** resultado observado coincide con el esperado.
- **FAIL:** registrar defecto, pasos y evidencia.
- **BLOQUEADO:** el entorno impide ejecutar; no cuenta como PASS.
- Al corregir un defecto, repetir el caso y conservar la referencia de ejecución más reciente.
