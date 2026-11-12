# language: en
Feature: Agenda institucional por rol
  Como visitante o administrador
  Quiero utilizar solo las funciones permitidas para mi rol
  Para consultar y mantener el directorio institucional

  Background:
    Given que abro la agenda como visitante

  @HU-01 @CP-02 @CP-04
  Scenario: Visitante consulta la agenda sin herramientas administrativas
    When ingreso a un ente institucional
    Then veo funcionarios activos
    But no veo controles administrativos

  @HU-02 @CP-06 @CP-07
  Scenario Outline: El acceso de administrador valida las credenciales
    When inicio sesión con usuario "<usuario>" y contraseña "<contraseña>"
    Then el acceso de administrador resulta "<resultado>"

    Examples:
      | usuario | contraseña | resultado |
      | admin   | admin      | concedido |
      | admin   | incorrecta | rechazado |

  @HU-02 @CP-08
  Scenario: Administrador abre y cancela el formulario de alta
    When inicio sesión como administrador de prueba
    And abro un ente institucional
    Then puedo abrir y cancelar el formulario de nuevo funcionario

  @HU-02 @CP-13
  Scenario: Administrador descarga el directorio en Excel
    When inicio sesión como administrador de prueba
    And abro un ente institucional
    And descargo el directorio en Excel
    Then se descarga un archivo Excel del directorio
