import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("que abro la agenda como visitante", () => {
  cy.clearLocalStorage();
  cy.visit("/");
  cy.contains("h2", "Seleccione el Ente Institucional").should("be.visible");
});

When("ingreso a un ente institucional", () => {
  cy.get(".ente-card").first().click();
  cy.contains(".ente-label", "ENTE ACTUAL:").should("be.visible");
});

Then("veo funcionarios activos y no veo controles administrativos", () => {
  cy.get(".funcionario-card").should("exist");
  cy.contains("button", "Nuevo Registro").should("not.exist");
  cy.contains("button", "Exportar Excel").should("not.exist");
  cy.screenshot("CP-02-CP-04-visitante");
});

When("inicio sesión como administrador de prueba", () => {
  cy.contains("button", "Acceso Administrador").click();
  cy.get('input[placeholder="Usuario"]').type("admin");
  cy.get('input[placeholder="Contraseña"]').type("admin");
  cy.contains("button", "Ingresar").click();
  cy.contains("button", "Exportar Excel").should("be.visible");
});

When("abro un ente institucional", () => {
  cy.get(".ente-card").first().click();
  cy.contains(".ente-label", "ENTE ACTUAL:").should("be.visible");
});

Then("puedo abrir y cancelar el formulario de nuevo funcionario", () => {
  cy.contains("button", "Nuevo Registro").click();
  cy.contains("h3", "Añadir Nuevo Funcionario").should("be.visible");
  cy.screenshot("CP-06-CP-08-admin-formulario");
  cy.contains("button", "Cancelar").click();
  cy.contains("h3", "Añadir Nuevo Funcionario").should("not.exist");
});

When("intento iniciar sesión con una contraseña incorrecta", () => {
  cy.contains("button", "Acceso Administrador").click();
  cy.get('input[placeholder="Usuario"]').type("admin");
  cy.get('input[placeholder="Contraseña"]').type("incorrecta");
  cy.on("window:alert", (mensaje) => {
    expect(mensaje).to.contain("Credenciales maestras incorrectas");
  });
  cy.contains("button", "Ingresar").click();
});

Then("se rechaza el acceso de administrador", () => {
  cy.contains("button", "Acceso Administrador").should("be.visible");
  cy.contains("button", "Exportar Excel").should("not.exist");
  cy.screenshot("CP-07-login-rechazado");
});
