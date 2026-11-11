import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    {
      name: "servidor-json-db",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Endpoint para guardar los cambios en el JSON
          if (
            req.method === "POST" &&
            req.url === "/api/guardar-funcionarios"
          ) {
            let body = "";
            req.on("data", (chunk) => {
              body += chunk.toString();
            });
            req.on("end", () => {
              try {
                const rutaJson = path.resolve(__dirname, "src/funcionarios.json");
                fs.writeFileSync(rutaJson, body, "utf8");
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(
                  JSON.stringify({
                    status: "ok",
                    mensaje: "Datos guardados en JSON con éxito",
                  }),
                );
              } catch (error) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(
                  JSON.stringify({ status: "error", mensaje: error.message }),
                );
              }
            });
          } else {
            next();
          }
        });
      },
    },
  ],
});
