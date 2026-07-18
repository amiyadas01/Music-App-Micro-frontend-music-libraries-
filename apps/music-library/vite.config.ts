import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const federation = require("@originjs/vite-plugin-federation");

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "musicLibrary",
      filename: "remoteEntry.js",
      exposes: {
        "./MusicLibraryApp": "./src/MusicLibraryApp.tsx",
      },
      shared: ["react", "react-dom", "@tanstack/react-query"],
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    modulePreload: false,
  },
  server: { port: 5001, cors: true },
  preview: { port: 5001, cors: true },
});
