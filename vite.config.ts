import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import path from "path";
// @ts-ignore
const rootDir = path.resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      src: path.resolve(rootDir, "src"),
      "@lib": path.resolve(rootDir, "src/lib"),
      "@components": path.resolve(rootDir, "src/components"),
    },
  },
});
