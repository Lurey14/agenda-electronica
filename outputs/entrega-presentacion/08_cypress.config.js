import { defineConfig } from "cypress";
import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";

export default defineConfig({
  video: true,
  screenshotOnRunFailure: true,
  screenshotsFolder: "evidence/cypress/screenshots",
  videosFolder: "evidence/cypress/videos",
  downloadsFolder: "node_modules/.cache/cypress-downloads",
  e2e: {
    baseUrl: "http://127.0.0.1:5173",
    specPattern: "cypress/e2e/**/*.feature",
    supportFile: "cypress/support/e2e.js",
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on("task", {
        async encontrarExcelDescargado() {
          const carpetaDescargas = resolve(
            config.projectRoot,
            config.downloadsFolder,
          );

          const limite = Date.now() + 10000;
          while (Date.now() < limite) {
            if (existsSync(carpetaDescargas)) {
              const archivo = readdirSync(carpetaDescargas).find((nombre) =>
                /^Directorio_TCP_Bolivia_.*\.xlsx$/i.test(nombre),
              );
              if (archivo) return archivo;
            }
            await new Promise((resolve) => setTimeout(resolve, 200));
          }

          return null;
        },
      });
      on(
        "file:preprocessor",
        createBundler({ plugins: [createEsbuildPlugin(config)] }),
      );
      return config;
    },
  },
});
