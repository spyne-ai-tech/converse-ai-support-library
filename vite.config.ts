import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { fileURLToPath } from "url";
import dts from "vite-plugin-dts";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === "library") {
    return {
      plugins: [
        react(),
        dts({
          tsconfigPath: "./tsconfig.build.json", // Use your new config
          include: ["src"],
          exclude: ["**/*.test.*", "**/*.stories.*"],
          outDir: "dist",
          insertTypesEntry: true,
        }),
      ],
      css: {
        postcss: "./postcss.config.js",
      },
      build: {
        lib: {
          entry: resolve(__dirname, "src/lib/index.ts"),
          name: "ConverseAISupport",
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
            assetFileNames: (assetInfo) => {
              if (assetInfo.name === "style.css") return "index.css";
              return assetInfo.name || "asset";
            },
          },
        },
        cssCodeSplit: false,
      },
    };
  }

  // Default dev configuration
  return {
    plugins: [react()],
    server: {
      host: true,
      allowedHosts: true,
    },
  };
});
