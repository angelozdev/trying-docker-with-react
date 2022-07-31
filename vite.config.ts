import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const sourcePath = path.resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": sourcePath,
      "@features": path.join(sourcePath, "features"),
      "@utils": path.join(sourcePath, "utils"),
      "@types": path.join(sourcePath, "types"),
    },
  },
});
