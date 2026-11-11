# language: es
Característica: Agenda institucional por rol
  Como visitante o administrador
  Quiero utilizar solo las funciones permitidas para mi rol
  Para consultar y mantener el directorio institucional

  @HU-01 @CP-02 @CP-04
  Escenario: Visitante consulta la agenda sin herramientas administrativas
    Dado que abro la agenda como visitante
    Cuando ingreso a un ente institucional
    Entonces veo funcionarios activos y no veo controles administrativos

  @HU-02 @CP-06 @CP-08
  Escenario: Administrador inicia sesión y abre el formulario de alta
    Dado que abro la agenda como visitante
    Cuando inicio sesión como administrador de prueba
    Y abro un ente institucional
    Entonces puedo abrir y cancelar el formulario de nuevo funcionario

  @HU-02 @CP-07
  Escenario: La agenda rechaza una contraseña incorrecta
    Dado que abro la agenda como visitante
    Cuando intento iniciar sesión con una contraseña incorrecta
    Entonces se rechaza el acceso de administrador
