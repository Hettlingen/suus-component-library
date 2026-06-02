import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "node:path";

/**
 * "external: ["react", "react-dom", "react/jsx-runtime"]
 * Damit wird React nicht in dein Package gebundled. Das ist wichtig, damit die Nutzer deiner Library nicht mehrere React-Instanzen haben, was zu Problemen führen kann.
 */
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      exclude: [
        "**/*.stories.ts",
        "**/*.stories.tsx",
        "**/*.docs.mdx",
        "**/*.mdx",
        ".storybook",
        "storybook-static",
      ],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "SUUS Component Library",
      fileName: "suus-component-library",
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
      },
    },
  },
});
