import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === "library") {
    return {
      plugins: [react()],
      build: {
        lib: {
          entry: resolve(__dirname, "src/lib/index.ts"),
          name: "ContactButtons",
          fileName: "index",
          formats: ["es", "cjs"],
        },
        rollupOptions: {
          external: ["react", "react-dom"],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
            },
          },
        },
      },
    };
  }

  // Default dev configuration
  return {
    plugins: [react()],
  };
});
