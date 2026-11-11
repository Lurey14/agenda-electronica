import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

function iniciarSesion(usuario, contraseña) {
  cy.contains("button", "Acceso Administrador").click();
  cy.get('input[placeholder="Usuario"]').type(usuario);
  cy.get('input[placeholder="Contraseña"]').type(contraseña);
  cy.on("window:alert", (mensaje) => {
    expect(mensaje).to.contain("Credenciales maestras incorrectas");
  });
  cy.contains("button", "Ingresar").click();
}

Given("que abro la agenda como visitante", () => {
  cy.clearLocalStorage();
  cy.visit("/");
  cy.contains("h2", "Seleccione el Ente Institucional").should("be.visible");
});

When("ingreso a un ente institucional", () => {
  cy.get(".ente-card").first().click();
  cy.contains(".ente-label", "ENTE ACTUAL:").should("be.visible");
});

Then("veo funcionarios activos", () => {
  cy.get(".funcionario-card").should("exist");
});

Then("no veo controles administrativos", () => {
  cy.contains("button", "Nuevo Registro").should("not.exist");
  cy.contains("button", "Exportar Excel").should("not.exist");
  cy.screenshot("CP-02-CP-04-visitante");
});

When("inicio sesión como administrador de prueba", () => {
  iniciarSesion("admin", "admin");
  cy.contains("button", "Exportar Excel").should("be.visible");
});

When(
  "inicio sesión con usuario {string} y contraseña {string}",
  (usuario, contraseña) => {
    iniciarSesion(usuario, contraseña);
  },
);

Then("el acceso de administrador resulta {string}", (resultado) => {
  if (resultado === "concedido") {
    cy.contains("button", "Exportar Excel").should("be.visible");
    return;
  }

  cy.contains("button", "Acceso Administrador").should("be.visible");
  cy.contains("button", "Exportar Excel").should("not.exist");
  cy.screenshot("CP-07-login-rechazado");
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

When("descargo el directorio en Excel", () => {
  cy.contains("button", "Exportar Excel").click();
});

Then("se descarga un archivo Excel del directorio", () => {
  cy.task("encontrarExcelDescargado", null, { timeout: 10000 })
    .should("match", /^Directorio_TCP_Bolivia_.*\.xlsx$/i)
    .then((nombreArchivo) => {
      cy.readFile(
        `node_modules/.cache/cypress-downloads/${nombreArchivo}`,
        null,
      ).should((archivo) => {
        expect(archivo.byteLength).to.be.greaterThan(0);
      });
    });
  cy.screenshot("CP-13-descarga-excel");
});
