import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from "@tailwindcss/vite";
import { resolve as resolvePath } from "node:path";
import { visualizer } from "rollup-plugin-visualizer";
import Icons from "unplugin-icons/vite";
import type { OutputOptions } from 'rolldown';

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss({ optimize: true }),
    Icons({
      compiler: "jsx",
      jsx: "react",
      iconCustomizer: (_c, _i, props) => {
        props["data-slot"] = "icon";
      },
    }),
    visualizer({ filename: "dist/_bundle.html", gzipSize: true }),
  ],
  server: { host: "0.0.0.0" },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolvePath(__dirname, "src"),
      },
      {
        find: "@pkg",
        replacement: resolvePath(__dirname, "pkg"),
      },
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
  },
});

type ManualChunksMeta = Parameters<OutputOptions["manualChunks"]>[1];
type GetModuleInfo = ManualChunksMeta["getModuleInfo"];

function manualChunks(id: string, { getModuleInfo }: ManualChunksMeta) {
  const info = getModuleInfo(id);
  if (!info) return;

  if (!id.includes("~icons") && !id.includes("node_modules")) return;
  
  // Non sono raggiungibili dal main tutte le dipendenze di moduli lazy-loaded.
  // Queste non vanno incluse nel bundle vendor (o icons), ma nei rispettivi moduli isolati.
  if (isReachableFromMainEntry(id, getModuleInfo)) {
    return id.includes("~icons") ? "icons" : "vendor";
  };
};

const MAIN_ENTRY = resolvePath(__dirname, "src/main.tsx");

function isReachableFromMainEntry(id: string, getModuleInfo: GetModuleInfo, seen = new Set()): boolean {
  if (id === MAIN_ENTRY) return true;
  if (seen.has(id)) return false;
  seen.add(id);

  const info = getModuleInfo(id);
  if (!info) return false;

  return info.importers.some((importer) =>
    isReachableFromMainEntry(importer, getModuleInfo, seen)
  );
}
