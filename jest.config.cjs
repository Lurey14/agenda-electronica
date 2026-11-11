module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapper: {
    "\.(css|less|scss)$": "identity-obj-proxy",
    "\.(jpe?g|png|gif|svg|webp)$": "<rootDir>/src/__mocks__/fileMock.cjs",
  },
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/main.jsx",
    "!src/setupTests.js",
    "!src/__mocks__/**",
  ],
};
