// Usado solo por Jest (Vite no usa Babel con @vitejs/plugin-react v6)
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
  // Reemplaza import.meta.env.* por process.env.* para que Jest lo entienda
  plugins: ["babel-plugin-transform-vite-meta-env"],
};
